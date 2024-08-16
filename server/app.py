from flask import Flask, make_response, jsonify, request, abort
from datetime import datetime, timedelta
from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from models import Appointment, db, User, Review, Part, Order, Service, Cart
import cloudinary
import cloudinary.uploader
import logging
from sqlalchemy.orm import joinedload
import requests
import os
from cloudinary import uploader
from mailersend import emails
from flask_mail import Mail, Message
import random
import string

mailer = emails.NewEmail(os.getenv("MAILERSEND_API_KEY"))
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.config.from_object('config.Config')
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'nathanieljaden490@gmail.com'
app.config['MAIL_PASSWORD'] = 'nxnl yqxe bafx ivkn'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_DEFAULT_SENDER'] = 'nathanieljaden490@gmail.com'

mail = Mail(app)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

cloudinary.config(
    cloud_name='dqo6dqmbh',
    api_key='684544826659325',
    api_secret='aRE8edsHfXlFPKfMLI5bkp0LB18'
)
def send_confirmation_email(user_email, appointment_details):
    msg = Message(
        subject="Appointment Confirmation",
        recipients=[user_email],
        html=f"<h1>Your Appointment is Confirmed</h1><p>Details: {appointment_details}</p>",
        body=f"Your appointment is confirmed. Details: {appointment_details}"
    )

    try:
        mail.send(msg)
        print("Confirmation email sent successfully.")
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.route('/confirm_appointment', methods=['POST'])
def confirm_appointment():
    data = request.json
    user_email = data.get('email')
    appointment_details = data.get('appointment_details')

    send_confirmation_email(user_email, appointment_details)

    return jsonify({"message": "Appointment confirmed and email sent."})


@app.route("/")
def index():
    return "<h1>This is an autospare app</h1>"

def send_2fa_code_via_email(email, code):
    msg = Message("Your 2FA Code",
                  sender="nathanieljaden490@gmail.com",
                  recipients=[email])
    msg.body = f"Your 2FA code is {code}. It will expire in 5 minutes."
    mail.send(msg)

@app.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid email or password'}), 401

        if user.is_two_factor_enabled:
            two_fa_code = user.generate_2fa_code()  # Call the method on the user instance
            send_2fa_code_via_email(user.email, two_fa_code)  # Use the correct function
            return jsonify({'message': '2FA code sent'}), 200

        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token, 'userId': user.id}), 200

    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({'error': 'Internal server error'}), 500



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"error": "Username or email already registered"}), 400

    new_user = User(username=username, email=email, role=role)
    new_user.set_password(password)

    try:
        db.session.add(new_user)
        db.session.commit()
        user_dict = {'id': new_user.id, 'username': new_user.username, 'email': new_user.email}
        return jsonify(user_dict), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error creating user: {e}")
        return jsonify({"error": "An error occurred during signup"}), 500
    
def get_current_user_email():
    try:
        current_user = get_jwt_identity()
        if 'email' in current_user:
            return current_user['email']
        else:
            raise ValueError("Email not found in JWT")
    except Exception as e:
        raise ValueError(f"Error retrieving email: {str(e)}")


def generate_2fa_code():
    return ''.join(random.choices(string.digits, k=6))

@app.route('/send-2fa-code', methods=['POST'])
@jwt_required()
def send_2fa_code():
    try:
        user_id = get_jwt_identity()
        print(f"User ID from JWT: {user_id}")

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_email = user.email
        if not user_email:
            return jsonify({"error": "No email found for user"}), 400

        # Generate and store 2FA code
        two_factor_code = generate_2fa_code()
        user.two_factor_code = two_factor_code
        user.code_expiry_time = datetime.utcnow() + timedelta(minutes=10)  # Set expiry time for 10 minutes

        # Log the generated code to verify it
        app.logger.info(f"Generated 2FA code: {two_factor_code} for user: {user_id}")

        # Commit changes to the database
        db.session.commit()

        msg = Message("Your 2FA Code",
                      sender=app.config['MAIL_USERNAME'],
                      recipients=[user_email])
        msg.body = f"Your 2FA code is {two_factor_code}"

        mail.send(msg)
        return jsonify({"message": "2FA code sent successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error sending 2FA code: {e}")
        return jsonify({"error": "Failed to send 2FA code"}), 500



@app.route('/verify-2fa-code', methods=['POST'])
@jwt_required()
def verify_2fa_code():
    data = request.json
    code = data.get('code')
    app.logger.info(f"Received 2FA code for verification: {code}")

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        # Check if the code matches and is not expired
        if user.two_factor_code == code and user.code_expiry_time > datetime.utcnow():
            app.logger.info("2FA code verified successfully")
            return jsonify({"message": "2FA code verified successfully"}), 200
        else:
            app.logger.info(f"Invalid or expired 2FA code: {code}")
            return jsonify({"error": "Invalid or expired 2FA code"}), 400
    else:
        app.logger.info("User not found")
        return jsonify({"error": "User not found"}), 404
    
@app.route('/contact-us', methods=['POST'])
def contact_us():
    data = request.get_json()
    user_email = data.get('email')
    message_body = data.get('message')
    phone = data.get('phone')

    if not user_email or not message_body:
        return jsonify({'error': 'Missing required information'}), 400

    email_body = f"""
    You have a new message from {user_email}.

    Phone: {phone}

    Message:
    {message_body}
    """

    msg = Message(
        subject="New Contact Us Message",
        recipients=['your-email@example.com'],  # Replace with your email
        body=email_body
    )

    try:
        mail.send(msg)
        return jsonify({'message': 'Message sent successfully'}), 200
    except Exception as e:
        print(f"Failed to send email: {e}")
        return jsonify({'error': 'Internal server error'}), 500
    
@app.route("/all_users")
def get_all_users():
    try:
        users = User.query.all()
        if not users:
            return jsonify({"message": "No users found"}), 404

        users_list = [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email
            } for user in users
        ]
        return make_response(jsonify(users_list), 200)
    except Exception as e:
        logging.error(f"Error fetching users: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        try:
            users = User.query.all()
            if not users:
                return jsonify({"message": "No users found"}), 404

            users_list = [
                {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role
                } for user in users
            ]
            return jsonify(users_list), 200
        except Exception as e:
            logging.error(f"Error fetching users: {e}")
            return jsonify({"error": str(e)}), 500

    elif request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "user")

        if not username or not email or not password:
            return jsonify({"error": "Missing username, email, or password"}), 400

        # Check if user already exists
        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already taken"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 400

        new_user = User(
            username=username,
            email=email,
            role=role
        )
        new_user.set_password(password)

        try:
            db.session.add(new_user)
            db.session.commit()
            user_dict = {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email,
                'role': new_user.role
            }
            return jsonify(user_dict), 201
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error creating user: {e}")
            return jsonify({"error": str(e)}), 500

@app.route("/users/<int:id>", methods=["GET", "PUT", "PATCH", "DELETE"])
def get_user_by_id(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user is None:
            return make_response(jsonify({"message": f"User id:{id} not found."}), 404)

        if request.method == "GET":
            user_dict = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            }
            return make_response(jsonify(user_dict), 200)

        elif request.method == "PUT":
            data = request.get_json()
            if not data:
                return jsonify({"message": "No data provided."}), 400

            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            user.role = data.get('role', user.role)
            if 'password' in data:
                user.set_password(data['password'])
            db.session.commit()

            user_dict = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            }
            return make_response(jsonify(user_dict), 200)

        elif request.method == "PATCH":
            data = request.get_json()
            if data:
                if 'username' in data:
                    user.username = data['username']
                if 'email' in data:
                    user.email = data['email']
                if 'role' in data:
                    user.role = data['role']
                if 'password' in data:
                    user.set_password(data['password'])
                db.session.commit()
                user_dict = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role
                }
                return make_response(jsonify(user_dict), 200)
            else:
                return jsonify({"message": "Invalid data provided."}), 400

        elif request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": f"User id:{id} has been deleted."}), 204
    except Exception as e:
        logging.error(f"Error processing user id:{id}: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/first_user")
def get_first_user():
    try:
        user = User.query.first()
        if not user:
            return jsonify({"message": "No users found"}), 404

        user_dict = {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }

        response = make_response(jsonify(user_dict), 200)
        return response
    except Exception as e:
        logging.error(f"Error fetching the first user: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/parts', methods=['GET', 'POST'])
def manage_parts():
    if request.method == 'POST':
        name = request.form.get('name', '')
        description = request.form.get('description', '')
        price = float(request.form.get('price', 0.0))
        stock_quantity = int(request.form.get('stock', 0))
        image_file = request.files.get('image')

        if image_file:
            result = cloudinary.uploader.upload(image_file, folder="your_folder_name")
            image_url = result.get('secure_url', '')
        else:
            image_url = ''

        part = Part(
            name=name,
            description=description,
            price=price,
            stock_quantity=stock_quantity,
            image_url=image_url
        )

        db.session.add(part)
        db.session.commit()
        return jsonify({'id': part.id}), 201

    elif request.method == 'GET':
        parts = Part.query.all()
        parts_list = [
            {
                'id': part.id,
                'name': part.name,
                'description': part.description,
                'price': str(part.price),
                'stock_quantity': part.stock_quantity,
                'image_url': part.image_url
            } for part in parts
        ]
        return jsonify(parts_list), 200

@app.route('/parts/<int:id>', methods=['GET', 'DELETE', 'PATCH'])
def manage_part_by_id(id):
    part = Part.query.get(id)
    if part is None:
        abort(404, description="Part not found")

    if request.method == 'GET':
        return jsonify({
            'id': part.id,
            'name': part.name,
            'description': part.description,
            'price': str(part.price),
            'stock_quantity': part.stock_quantity,
            'image_url': part.image_url
        }), 200

    elif request.method == 'DELETE':
        # Remove the image from Cloudinary if it exists
        if part.image_url:
            public_id = part.image_url.split('/')[-1].split('.')[0]  # Extract the public ID
            cloudinary.uploader.destroy(public_id, resource_type="image")

        db.session.delete(part)
        db.session.commit()
        return jsonify({'message': 'Part deleted successfully'}), 200

    elif request.method == 'PATCH':
        # Parse form data
        name = request.form.get('name')
        description = request.form.get('description')
        price = request.form.get('price')
        stock_quantity = request.form.get('stock')
        image_file = request.files.get('image')

        # Update fields if provided
        if name is not None:
            part.name = name
        if description is not None:
            part.description = description
        if price is not None:
            part.price = float(price)
        if stock_quantity is not None:
            part.stock_quantity = int(stock_quantity)
        
        # Handle image update
        if image_file:
            # Delete old image from Cloudinary if it exists
            if part.image_url:
                public_id = part.image_url.split('/')[-1].split('.')[0]
                cloudinary.uploader.destroy(public_id, resource_type="image")
            
            # Upload the new image to Cloudinary
            result = cloudinary.uploader.upload(image_file, folder="your_folder_name")
            part.image_url = result.get('secure_url', '')

        db.session.commit()

        return jsonify({
            'id': part.id,
            'name': part.name,
            'description': part.description,
            'price': str(part.price),
            'stock_quantity': part.stock_quantity,
            'image_url': part.image_url
        }), 200

@app.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    reviews_list = [
        {
            'id': review.id,
            'title': review.title,
            'body': review.body,
            'user_id': review.user_id,
            'status': review.status,
            'created_at': review.created_at
        } for review in reviews
    ]
    return jsonify(reviews_list), 200

from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/my-reviews', methods=['GET'])
@jwt_required()
def get_my_reviews():
    user_id = get_jwt_identity()  # This will work after the JWT is verified
    reviews = Review.query.filter_by(user_id=user_id).all()
    return jsonify([review.to_dict() for review in reviews])


@app.route('/reviews', methods=['POST'])
@jwt_required()  
def create_review():
    data = request.get_json()
    user_id = get_jwt_identity()

    if not user_id:
        return jsonify({'error': 'User ID not found in token'}), 401

    review = Review(
        title=data.get('title', ''),
        body=data.get('body', ''),
        user_id=user_id, 
        status='pending'
    )

    db.session.add(review)
    db.session.commit()
    return jsonify({'id': review.id}), 201

@app.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"msg": "User ID is missing"}), 400

    orders = Order.query.options(joinedload(Order.cart_items)).filter_by(user_id=user_id).all()
    return jsonify([order.to_dict() for order in orders])
    
@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    cart_items = data.get('cart_items')
    
    if not user_id or not cart_items:
        return jsonify({'msg': 'Invalid request data'}), 400

    try:
        total_amount = 0
        for item in cart_items:
            part = Part.query.get(item['part_id'])
            if part is None:
                return jsonify({'msg': f'Invalid part ID {item["part_id"]} in cart'}), 400
            
            total_amount += part.price * item['quantity']

        # Create order
        order = Order(
            user_id=user_id,
            status='Pending',
            total_amount=total_amount
        )
        db.session.add(order)
        db.session.commit()

        return jsonify({'id': order.id}), 201

    except Exception as e:
        print(f"Error during checkout: {e}")
        return jsonify({'msg': 'Failed to create order', 'error': str(e)}), 500


@app.route('/services', methods=['POST'])
def create_service():
    order_id = request.form.get('order_id')
    mechanic_id = request.form.get('mechanic_id')
    description = request.form.get('description')
    cost = request.form.get('cost')
    image_url = None

    image = request.files.get('image')
    if image:
        upload_result = uploader.upload(image)
        image_url = upload_result.get('url')

    service = Service(
        order_id=order_id,
        mechanic_id=mechanic_id,
        description=description,
        cost=cost,
        image_url=image_url
    )

    db.session.add(service)
    db.session.commit()

    return jsonify({'id': service.id}), 201

@app.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    services_list = []
    for service in services:
        services_list.append({
            'id': service.id,
            'order_id': service.order_id,
            'mechanic_id': service.mechanic_id,
            'description': service.description,
            'cost': str(service.cost),
            'image_url': service.image_url,
            'created_at': service.created_at
        })
    return jsonify(services_list), 200

@app.route('/services/<int:service_id>', methods=['PATCH'])
def update_service(service_id):
    service = Service.query.get_or_404(service_id)

    if 'order_id' in request.form:
        service.order_id = request.form['order_id']
    if 'mechanic_id' in request.form:
        service.mechanic_id = request.form['mechanic_id']
    if 'description' in request.form:
        service.description = request.form['description']
    if 'cost' in request.form:
        service.cost = request.form['cost']

    image = request.files.get('image')
    if image:
        upload_result = uploader.upload(image)
        service.image_url = upload_result.get('url')

    db.session.commit()

    return jsonify({'message': 'Service updated successfully'}), 200

@app.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Service.query.get_or_404(service_id)

    if service.image_url:
        public_id = service.image_url.split('/')[-1].split('.')[0]
        uploader.destroy(public_id)

    db.session.delete(service)
    db.session.commit()

    return jsonify({'message': 'Service deleted successfully'}), 200

@app.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    try:
        user_id = get_jwt_identity()  # Directly use the integer returned by get_jwt_identity()

        data = request.get_json()
        part_id = data.get('part_id')
        part_name = data.get('part_name')
        quantity = data.get('quantity')
        price = data.get('price')
        image_url = data.get('image_url')

        if not part_id or not part_name or not quantity or price is None:
            return jsonify({'error': 'Missing data'}), 400

        total_amount = price * quantity  # Calculate total_amount

        cart_item = Cart(
            user_id=user_id,
            part_id=part_id,
            part_name=part_name,
            quantity=quantity,
            price=price,
            total_amount=total_amount,
            image_url=image_url
        )

        db.session.add(cart_item)
        db.session.commit()

        return jsonify({'message': 'Item added to cart', 'item': {
            'user_id': user_id,
            'part_id': part_id,
            'part_name': part_name,
            'quantity': quantity,
            'price': price,
            'total_amount': total_amount,
            'image_url': image_url
        }}), 201

    except Exception as e:
        print(f"Error adding to cart: {e}")
        db.session.rollback()
        return jsonify({'msg': 'Internal server error', 'error': str(e)}), 500

@app.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    try:
        user_id = get_jwt_identity()  

        items = Cart.query.filter_by(user_id=user_id).all()
        
        items_list = [
            {
                'part_id': item.part_id,
                'part_name': item.part_name,
                'quantity': item.quantity,
                'image_url': item.image_url,
                'price': float(item.price), 
                'total_amount': float(item.total_amount)  
            }
            for item in items
        ]

        total_amount = sum(item['total_amount'] for item in items_list)

        return jsonify({'items': items_list, 'total_amount': total_amount}), 200

    except Exception as e:
        app.logger.error(f'Error fetching cart items: {e}')
        return jsonify({'msg': 'Internal server error', 'error': str(e)}), 500


@app.route('/cart/<int:part_id>', methods=['DELETE'])
@jwt_required()
def delete_cart_item(part_id):
    try:
        user_id = get_jwt_identity()  
        cart_item = Cart.query.filter_by(part_id=part_id, user_id=user_id).first()

        if cart_item:
            db.session.delete(cart_item)
            db.session.commit()
            return jsonify({"message": "Item removed from cart"}), 200
        else:
            return jsonify({"message": "Item not found or not authorized"}), 404

    except Exception as e:
        app.logger.error(f'Error deleting cart item: {e}')
        return jsonify({'msg': 'Internal server error', 'error': str(e)}), 500

def send_purchase_email(email, cart_items, total_amount, mpesa_number):
    item_details = "\n".join([f"{item['part_name']} x {item['quantity']}" for item in cart_items])
    email_body = f"""
    Thank you for your purchase!

    Your order details:
    {item_details}

    Total Amount: {total_amount}

    Please send the payment to the following MPesa number: {mpesa_number}
    """

    msg = Message(
        subject="Your Purchase Details",
        recipients=[email],
        html=f"<h1>Thank you for your purchase!</h1><p>Your order details:<br>{item_details}<br>Total Amount: {total_amount}<br>Please send the payment to: {mpesa_number}</p>",
        body=email_body
    )

    try:
        mail.send(msg)
        print("Email sent successfully.")
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False


@app.route('/send-email', methods=['POST'])
@jwt_required()
def send_email():
    data = request.get_json()
    email = data.get('email')
    cart_items = data.get('cartItems')
    total_amount = data.get('totalAmount')
    mpesa_number = data.get('mpesaNumber')

    if not email or not cart_items or not total_amount or not mpesa_number:
        return jsonify({'error': 'Missing information'}), 400

    if send_purchase_email(email, cart_items, total_amount, mpesa_number):
        return jsonify({'message': 'Email sent successfully'}), 200
    else:
        return jsonify({'msg': 'Internal server error'}), 500

@app.route('/appointment', methods=['POST'])
def create_appointment():
    try:
        data = request.get_json()  
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate the required fields
        required_fields = ['user_id', 'service_id', 'appointment_date', 'status']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Validate and parse the appointment_date
        try:
            appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD HH:MM:SS"}), 400

        new_appointment = Appointment(
            user_id=data['user_id'],
            service_id=data['service_id'],
            appointment_date=appointment_date,
            status=data['status'],
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=data.get('email'),
            phone_number=data.get('phoneNumber'),
            note=data.get('note')
        )

        db.session.add(new_appointment)
        db.session.commit()

        return jsonify({"id": new_appointment.id}), 201
    
    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error creating appointment: {str(e)}")
        
        return jsonify({"error": "An error occurred while creating the appointment"}), 500
    
@app.route('/appointment/<int:id>', methods=['GET'])
def get_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    return jsonify({
        'id': appointment.id,
        'user_id': appointment.user_id,
        'service_id': appointment.service_id,
        'appointment_date': appointment.appointment_date.isoformat(),
        'status': appointment.status,
        'created_at': appointment.created_at.isoformat()
    })

@app.route('/appointment', methods=['GET'])
def get_all_appointments():
    appointments = Appointment.query.all()
    results = []
    
    for appointment in appointments:
        appointment_data = {
            'id': appointment.id,
            'user_id': appointment.user_id,
            'service_id': appointment.service_id,
            'appointment_date': appointment.appointment_date.isoformat(),
            'status': appointment.status,
            'created_at': appointment.created_at.isoformat()
        }
        results.append(appointment_data)
    
    return jsonify(results), 200

@app.route('/appointment/<int:id>', methods=['PUT'])
def update_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    data = request.json
    appointment.status = data.get('status', appointment.status)
    db.session.commit()
    return jsonify({
        'id': appointment.id,
        'status': appointment.status
    })

@app.route('/appointment/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({'message': 'Appointment deleted'}), 204


if __name__ == '__main__':
    port =int(os.environ.get("PORT", 5000))

    app.run(host="0.0.0.0",port=port)
