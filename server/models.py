from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from werkzeug.security import generate_password_hash, check_password_hash

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    orders = db.relationship('Order', back_populates='user')
    cart_items = db.relationship('Cart', back_populates='user')

class Part(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    image_url = db.Column(db.String(500), nullable=True)

    cart_items = db.relationship('Cart', back_populates='part')


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(50), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship('User', back_populates='orders')
    cart_items = db.relationship('Cart', back_populates='order', overlaps='cart_items,order_association')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'order_date': self.order_date.isoformat() if self.order_date else None,
            'status': self.status,
            'total_amount': str(self.total_amount) if self.total_amount else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'user': self.user.username if self.user else None,  # Assuming you want to include the username
            'cart_items': [item.to_dict() for item in self.cart_items]  # Assuming `Cart` model has a `to_dict` method
        }



class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    mechanic_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    description = db.Column(db.Text, nullable=False)
    cost = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    image_url = db.Column(db.String(500), nullable=True)

    order = db.relationship('Order', backref=db.backref('services', lazy=True))
    mechanic = db.relationship('User', backref=db.backref('services', lazy=True))


class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    part_id = db.Column(db.Integer, db.ForeignKey('part.id'), nullable=False)
    part_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    image_url = db.Column(db.String(500), nullable=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    price = db.Column(db.Numeric(10, 2), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    
    user = db.relationship('User', back_populates='cart_items')
    part = db.relationship('Part', back_populates='cart_items')
    order = db.relationship('Order', back_populates='cart_items')

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship('User', backref=db.backref('appointments', lazy=True))
    service = db.relationship('Service', backref=db.backref('appointments', lazy=True))
