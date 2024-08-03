from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models after initializing db and migrate
from models import User, Part, Review, Order, Service, Cart

@app.route('/')
def index():
    return 'Hello, World!'  et_json()
    if not data or not 'username' in data or not 'password' in data:
        abort(400)

    user = User(username=data['username'], role=data['role'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id}), 201

@app.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user is None or not user.check_password(data['password']):
        abort(400)
    return jsonify({'id': user.id, 'username': user.username}), 200

@app.route('/parts', methods=['GET', 'POST'])
def manage_parts():
    if request.method == 'POST':
        data = request.get_json()
        part = Part(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            stock_quantity=data['stock_quantity'],
            image_url=data.get('image_url')
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

@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    review = Review(
        title=data['title'],
        body=data['body'],
        user_id=data['user_id'],
        status=data['status']
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({'id': review.id}), 201

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    order = Order(
        user_id=data['user_id'],
        status=data['status'],
        total_amount=data['total_amount']
    )
    db.session.add(order)
    db.session.commit()
    return jsonify({'id': order.id}), 201

@app.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    service = Service(
        order_id=data['order_id'],
        mechanic_id=data['mechanic_id'],
        description=data['description'],
        cost=data['cost'],
        image_url=data.get('image_url')
    )
    db.session.add(service)
    db.session.commit()
    return jsonify({'id': service.id}), 201

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    cart_item = Cart(
        user_id=data['user_id'],
        product_id=data['product_id'],
        quantity=data['quantity']
    )
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({'id': cart_item.id}), 201

@app.route('/cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': item.id,
        'user_id': item.user_id,
        'product_id': item.product_id,
        'quantity': item.quantity,
        'created_at': item.created_at,
        'image_url': item.image_url
    } for item in cart_items]), 200

if __name__ == '__main__':
    app.run(debug=True)
