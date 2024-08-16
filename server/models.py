from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from werkzeug.security import generate_password_hash, check_password_hash
import pyotp

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='user')
    is_two_factor_enabled = db.Column(db.Boolean, default=False)
    totp_secret = db.Column(db.String(16), nullable=True)
    two_factor_code = db.Column(db.String(6), nullable=True)
    code_expiry_time = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_2fa_code(self):
        if not self.totp_secret:
            raise ValueError("TOTP secret not set for user.")

        totp = pyotp.TOTP(self.totp_secret)
        code = totp.now()
        code_expiry_time = datetime.utcnow() + timedelta(minutes=5)

        self.two_factor_code = code
        self.code_expiry_time = code_expiry_time
        db.session.commit()

        return code

    def verify_2fa_code(self, code):
        if self.two_factor_code == code and datetime.utcnow() < self.code_expiry_time:
            return True
        return False
    
    orders = db.relationship('Order', back_populates='user')
    cart_items = db.relationship('Cart', back_populates='user')

class TwoFactorAuth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    generated_code = db.Column(db.String(6), nullable=False)
    generated_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(50), nullable=False)  # e.g., "used", "expired"

    user = db.relationship('User', backref=db.backref('two_factor_auth', lazy=True))

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

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'user_id': self.user_id,
            'status': self.status,
            'created_at': self.created_at.isoformat()  # Convert datetime to string
        }

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
    first_name = db.Column(db.String(50))  # Added field
    last_name = db.Column(db.String(50))   # Added field
    email = db.Column(db.String(100))      # Added field
    phone_number = db.Column(db.String(20)) # Added field
    note = db.Column(db.Text)              # Added field
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship('User', backref=db.backref('appointments', lazy=True))
    service = db.relationship('Service', backref=db.backref('appointments', lazy=True))
