from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from models import db, User, Review, Part, Order, Service, Cart
import cloudinary
import cloudinary.uploader
import logging


# Setting up basic logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.config.from_object('config.Config')
app.config['SECRET_KEY'] = 'your_secret_key_here'

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

cloudinary.config(
    cloud_name='dqo6dqmbh',
    api_key='684544826659325',
    api_secret='aRE8edsHfXlFPKfMLI5bkp0LB18'
)

@app.route("/")
def index():
    return "<h1>This is an autospare app</h1>"

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    
    print("Email:", email)  # Debug
    print("Password:", password)  # Debug
    
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        print("User not found")
    elif not user.check_password(password):
        print("Password check failed")

    if user is None or not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Include user ID in the token payload
    access_token = create_access_token(identity={"id": user.id})
    return jsonify(access_token=access_token, role=user.role)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')  # Default role to 'user' if not provided

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

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
            'email': new_user.email
        }
        return jsonify(user_dict), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error creating user: {e}")
        return jsonify({"error": "An error occurred during signup"}), 500

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
        data = request.get_json()

        # Create a new part instance with the provided data
        part = Part(
            name=data.get('name', ''),
            description=data.get('description', ''),
            price=float(data.get('price', 0.0)),
            stock_quantity=int(data.get('stock', 0)),
            image_url=data.get('imageUrl', '')
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

    
@app.route('/parts/<int:id>', methods=['GET'])
def get_part_by_id(id):
    part = Part.query.get(id)
    if part is None:
        abort(404, description="Part not found")
    
    return jsonify({
        'id': part.id,
        'name': part.name,
        'description': part.description,
        'price': str(part.price),
        'stock_quantity': part.stock_quantity,
        'image_url': part.image_url
    }), 200

@app.route('/reviews', methods=['GET', 'POST'])
def manage_reviews():
    if request.method == 'POST':
        data = request.get_json()

        # Set default values for fields not provided by the frontend
        review = Review(
            title=data.get('title', ''),
            body=data.get('body', ''),
            user_id=1,  # Assuming the user_id is 1 for now; you can adjust as needed
            status='pending'  # Set default status to 'pending'
        )

        db.session.add(review)
        db.session.commit()
        return jsonify({'id': review.id}), 201

    elif request.method == 'GET':
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


@app.route('/orders', methods=['GET', 'POST'])
def manage_orders():
    if request.method == 'POST':
        data = request.get_json()
        order = Order(
            user_id=data['user_id'],
            status=data['status'],
            total_amount=data['total_amount']
        )
        db.session.add(order)
        db.session.commit()
        return jsonify({'id': order.id}), 201

    elif request.method == 'GET':
        orders = Order.query.all()
        orders_list = [
            {
                'id': order.id,
                'user_id': order.user_id,
                'order_date': order.order_date,
                'status': order.status,
                'total_amount': str(order.total_amount),
                'created_at': order.created_at
            } for order in orders
        ]
        return jsonify(orders_list), 200

@app.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    image = request.files.get('image')
    
    if image:
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result.get('url')
    else:
        image_url = data.get('image_url')
    
    service = Service(
        order_id=data['order_id'],
        mechanic_id=data['mechanic_id'],
        description=data['description'],
        cost=data['cost'],
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


@app.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    try:
        user_identity = get_jwt_identity()  # This returns the full user identity, e.g., a dictionary
        user_id = user_identity['id']  # Extract the user ID

        data = request.get_json()
        part_id = data.get('part_id')
        part_name = data.get('part_name')
        quantity = data.get('quantity')

        if not part_id or not part_name or not quantity:
            return jsonify({'error': 'Missing data'}), 400

        # Create a new Cart item
        cart_item = Cart(
            user_id=user_id,  # Pass the extracted user ID
            part_id=part_id,
            part_name=part_name,
            quantity=quantity
        )

        # Add the new item to the session and commit the transaction
        db.session.add(cart_item)
        db.session.commit()

        return jsonify({'message': 'Item added to cart', 'item': {
            'user_id': user_id,
            'part_id': part_id,
            'part_name': part_name,
            'quantity': quantity
        }}), 201

    except Exception as e:
        print(f"Error adding to cart: {e}")
        db.session.rollback()  # Rollback in case of an error
        return jsonify({'msg': 'Internal server error', 'error': str(e)}), 500


    
@app.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    try:
        current_user = get_jwt_identity()
        user_id = current_user.get('id')  # Adjust based on your JWT payload structure

        if not user_id:
            raise ValueError("User ID not found in JWT token")

        items = Cart.query.filter_by(user_id=user_id).all()
        items_list = [{'part_id': item.part_id, 'part_name': item.part_name, 'quantity': item.quantity} for item in items]

        return jsonify({'items': items_list}), 200
    except Exception as e:
        app.logger.error(f'Error fetching cart items: {e}')
        return jsonify({'msg': 'Internal server error', 'error': str(e)}), 500

@app.route('/cart/<int:part_id>', methods=['DELETE'])
@jwt_required()
def delete_cart_item(part_id):
    # Ensure get_jwt_identity() returns just the user_id
    current_user_id = get_jwt_identity()
    
    if isinstance(current_user_id, dict):
        current_user_id = current_user_id.get('id')
    
    cart_item = Cart.query.filter_by(part_id=part_id, user_id=current_user_id).first()
    
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({"message": "Item removed from cart"}), 200
    else:
        return jsonify({"message": "Item not found or not authorized"}), 403

if __name__ == '__main__':
    app.run(debug=True)
