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
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity={"username": user.username, "role": user.role})
    return jsonify(access_token=access_token, role=user.role)

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
        return jsonify({"error": str(e)}), 500

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
        # data = request.get_json()
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        stock_quantity = request.form['stock_quantity']
        image = request.files.get('image')
        
        if image:
            upload_result = cloudinary.uploader.upload(image)
            image_url = upload_result.get('url')
        else:
            image_url = request.form['image_url']
        
        part = Part(
            name=name,
            description=description,
            price=float(price),
            stock_quantity=int(stock_quantity),
            image_url=image_url
        )
        db.session.add(part)
        db.session.commit()
        return jsonify({'id': part.id}), 201
    else:
        parts = Part.query.all()
        return jsonify([{
            'id': part.id,
            'name': part.name,
            'description': part.description,
            'price': str(part.price),
            'stock_quantity': part.stock_quantity,
            'image_url': part.image_url
        } for part in parts]), 200
    
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

@app.route('/cart', methods=['GET', 'POST'])
@jwt_required()
def manage_cart():
    if request.method == 'POST':
        data = request.get_json()

        user_id = get_jwt_identity()  

        cart_item = Cart(
            product_id=data.get('productId'),
            quantity=data.get('quantity', 1),
            user_id=user_id  
        )

        db.session.add(cart_item)
        db.session.commit()
        return jsonify({'id': cart_item.id}), 201

    elif request.method == 'GET':
        user_id = get_jwt_identity()
        cart_items = Cart.query.filter_by(user_id=user_id).all()
        cart_list = [
            {
                'id': item.id,
                'product_id': item.product_id,
                'quantity': item.quantity,
                'user_id': item.user_id
            } for item in cart_items
        ]
        return jsonify(cart_list), 200

@app.route('/cart/<int:id>', methods=['GET'])
def get_cart_item(id):
    cart_item = Cart.query.get_or_404(id)
    return jsonify(cart_item.to_dict()), 200


if __name__ == '__main__':
    app.run(debug=True)
