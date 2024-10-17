from datetime import date
from models import AnimalType, HealthRecord, Farmer, Sale, Animal, Production, Feed
from config import db, app

def seed():
    with app.app_context():
        # Clear existing data (optional)
        db.session.query(Sale).delete()
        db.session.query(Feed).delete()
        db.session.query(Production).delete()
        db.session.query(HealthRecord).delete()
        db.session.query(Animal).delete()
        db.session.query(AnimalType).delete()
        db.session.query(Farmer).delete()

        # Farmers
        farmer1 = Farmer(name="John Doe", email="john@example.com", phone="555-1234", address="123 Farm Lane", password="password123")
        farmer2 = Farmer(name="Jane Smith", email="jane@example.com", phone="555-5678", address="456 Country Road", password="password456")

        # Animal Types
        cow_type = AnimalType(type_name="Cow", description="Dairy Cattle")
        chicken_type = AnimalType(type_name="Chicken", description="Broiler Chicken")

        # Animals
        cow1 = Animal(name="Bessie", animal_type_id=1, age=5, farmer_id=1, health_status="Healthy", birth_date=date(2019, 5, 15), breed="Holstein")
        cow2 = Animal(name="Daisy", animal_type_id=1, age=3, farmer_id=1, health_status="Healthy", birth_date=date(2021, 3, 21), breed="Jersey")
        chicken1 = Animal(name="Clucky", animal_type_id=2, age=1, farmer_id=2, health_status="Healthy", birth_date=date(2023, 1, 1), breed="Leghorn")

        # Health Records
        health_record1 = HealthRecord(animal_id=1, checkup_date=date(2023, 5, 10), treatment="Vaccination", notes="Routine checkup", vet_name="Dr. Brown")
        health_record2 = HealthRecord(animal_id=2, checkup_date=date(2023, 6, 20), treatment="Vitamin shot", notes="Lack of appetite", vet_name="Dr. Taylor")

        # Production Records
        production1 = Production(animal_id=1, product_type="Milk", quantity=20.5, production_date=date(2023, 10, 1))
        production2 = Production(animal_id=1, product_type="Milk", quantity=18.0, production_date=date(2023, 10, 2))
        production3 = Production(animal_id=2, product_type="Milk", quantity=25.0, production_date=date(2023, 10, 3))

        # Feed Records
        feed1 = Feed(animal_id=1, feed_type="Hay", quantity=10.0, date=date(2023, 10, 1))
        feed2 = Feed(animal_id=2, feed_type="Grain", quantity=8.0, date=date(2023, 10, 2))

        # Sales Records
        sale1 = Sale(animal_id=1, product_type="Milk", quantity_sold=15.0, sale_date=date(2023, 10, 5), amount=150.0)
        sale2 = Sale(animal_id=2, product_type="Milk", quantity_sold=10.0, sale_date=date(2023, 10, 6), amount=120.0)

        # Adding data to the session
        db.session.add_all([farmer1, farmer2])
        db.session.add_all([cow_type, chicken_type])
        db.session.add_all([cow1, cow2, chicken1])
        db.session.add_all([health_record1, health_record2])
        db.session.add_all([production1, production2, production3])
        db.session.add_all([feed1, feed2])
        db.session.add_all([sale1, sale2])

        # Commit the transaction
        db.session.commit()

        print("Database seeded successfully.")

if __name__ == '__main__':
    # Seed the data
    seed()
