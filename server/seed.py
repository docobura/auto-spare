from app import app, db
from models import User, Part, Review, Order, Service, Cart

def populate_data():
    with app.app_context():
        # Drop all tables and create them again
        db.drop_all()
        db.create_all()

        # Create Users
        user1 = User(username='johnb_doe', email='johnb_doe@example.com', role='customer')
        user1.set_password('password123')
        user2 = User(username='janeg_doe', email='janeg_doe@example.com', role='mechanic')
        user2.set_password('password456')

        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

        # Create Parts
        part1 = Part(name='Brake Pad', description='High quality brake pad', price=29.99, stock_quantity=50, image_url='http://example.com/brakepad.jpg')
        part2 = Part(name='Oil Filter', description='Oil filter for car', price=15.49, stock_quantity=100, image_url='http://example.com/oilfilter.jpg')

        db.session.add(part1)
        db.session.add(part2)
        db.session.commit()

        # Create Reviews
        review1 = Review(title='Great Brake Pad', body='These brake pads are really good!', user_id=user1.id, status='approved')
        review2 = Review(title='Good Oil Filter', body='Does the job well.', user_id=user1.id, status='approved')

        db.session.add(review1)
        db.session.add(review2)
        db.session.commit()

        # Create Orders
        order1 = Order(user_id=user1.id, status='completed', total_amount=45.48)
        order2 = Order(user_id=user1.id, status='pending', total_amount=29.99)

        db.session.add(order1)
        db.session.add(order2)
        db.session.commit()

        # Create Services
        service1 = Service(order_id=order1.id, mechanic_id=user2.id, description='Brake pad replacement', cost=30.00, image_url='http://example.com/service1.jpg')
        service2 = Service(order_id=order2.id, mechanic_id=user2.id, description='Oil filter change', cost=15.00, image_url='http://example.com/service2.jpg')

        db.session.add(service1)
        db.session.add(service2)
        db.session.commit()

        # Create Cart Items
        cart_item1 = Cart(user_id=user1.id, part_id=part1.id, part_name=part1.name, quantity=2)  # Adjusted for schema
        cart_item2 = Cart(user_id=user1.id, part_id=part2.id, part_name=part2.name, quantity=1)  # Adjusted for schema

        db.session.add(cart_item1)
        db.session.add(cart_item2)
        db.session.commit()

        print("Database populated successfully!")

if __name__ == '__main__':
    populate_data()
