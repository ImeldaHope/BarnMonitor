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
        cow1 = Animal(name="Bessie", animal_type_id=1, age=5, image="https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294279.jpg?t=st=1729195647~exp=1729199247~hmac=ba449bfe6fe5b7ca4e316540d238d7a8768720bf9a3dda25ff4f4c4bf6e6f4b2&w=360", farmer_id=1, health_status="Healthy", birth_date=date(2019, 5, 15), breed="Holstein")
        cow2 = Animal(name="Daisy", animal_type_id=1, age=3, image="https://img.freepik.com/premium-photo/horse-field-against-clear-sky_1048944-12488816.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid", farmer_id=1, health_status="Healthy", birth_date=date(2021, 3, 21), breed="Jersey")
        chicken1 = Animal(name="Clucky", animal_type_id=2, age=1, image="https://img.freepik.com/free-photo/close-up-beautiful-chicken_23-2150741649.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid", farmer_id=2, health_status="Healthy", birth_date=date(2023, 1, 1), breed="Leghorn")

        # Health Records
        health_record1 = HealthRecord(animal_id=1, checkup_date=date(2023, 5, 10), treatment="Vaccination", notes="Routine checkup", vet_name="Dr. Brown")
        health_record2 = HealthRecord(animal_id=2, checkup_date=date(2023, 6, 20), treatment="Vitamin shot", notes="Lack of appetite", vet_name="Dr. Taylor")

        # Production Records
        production1 = Production(animal_id=1, product_type="Milk", quantity=20, production_date='2023-10-01')
        production2 = Production(animal_id=1, product_type="Milk", quantity=18, production_date='2023-10-02')
        production3 = Production(animal_id=2, product_type="Milk", quantity=25, production_date='2023-10-03')

        # Feed Records
        feed1 = Feed(animal_id=1, feed_type="Hay", quantity=10.0, date=date(2023, 10, 1))
        feed2 = Feed(animal_id=2, feed_type="Grain", quantity=8.0, date=date(2023, 10, 2))

        # Sales Records
        sale1 = Sale(animal_id=1, product_type="Milk", quantity_sold=15, sale_date='2023-10-5', amount=150.0)
        sale2 = Sale(animal_id=2, product_type="Milk", quantity_sold=10, sale_date='2023-10-6', amount=120.0)

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
