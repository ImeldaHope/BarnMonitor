import random
from models import AnimalType, HealthRecord, Farmer, Sale, Animal, Production, Feed
from config import db, app
from datetime import datetime, date, timedelta
from faker import Faker
from werkzeug.security import generate_password_hash

def seed():
    fake = Faker()
    with app.app_context():
        # Clear existing data (optional)
        db.session.query(Sale).delete()
        db.session.query(Feed).delete()
        db.session.query(Production).delete()
        db.session.query(HealthRecord).delete()
        db.session.query(Animal).delete()
        db.session.query(AnimalType).delete()
        db.session.query(Farmer).delete()

        # Create 5 Farmers
        farmers = []
        for i in range(1, 6):
            farmer = Farmer(
                name=fake.name(),
                email=fake.email(),
                phone=fake.phone_number(),
                address=fake.address(),
                password=generate_password_hash("password123")
            )
            farmers.append(farmer)

        db.session.add_all(farmers)
        db.session.commit()

        #Animal Type
        dairy_type = AnimalType(type_name="Dairy", description="Dairy animals for milk production")
        beef_type = AnimalType(type_name="Beef", description="Beef animals for beef production")
        types= [dairy_type, beef_type]
        db.session.add_all(types)
        db.session.commit()

        # Dairy animal breeds
        dairy_breeds = ["Holstein", "Jersey", "Guernsey", "Ayrshire", "Brown Swiss"]

        def random_date_2019():
            """Generates a random date in 2023 in the format 'YYYY-MM-DD'."""
            random_day = random.randint(1, 365)
            # Calculate the date by adding the random day to January 1, 2023
            random_date = date(2019, 1, 1) + timedelta(days=random_day - 1)
            return random_date
        
        def random_date_string_2021():
            """Generates a random date in 2023 in the format 'YYYY-MM-DD' as a string."""
            month = random.randint(1, 12)
            day = random.randint(1, 28)
            return f"2021-{month:02d}-{day:02d}"
        
        animal_images = [
            "https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294279.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid",  
            "https://img.freepik.com/free-photo/photorealistic-view-cow-barn_23-2151294234.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid",  
            "https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294201.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid",  
            "https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-outdoors_23-2151294223.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid",  
            "https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294266.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid"   
        ]

        treatments = [
            "Routine Checkup",
            "Vaccination",
            "Antibiotic Treatment",
            "Deworming",
            "Injury Treatment",
            "Nutritional Supplement"
        ]

        notes = [
            "General health check",
            "Administered annual vaccine",
            "Treated for infection",
            "Deworming completed",
            "Minor injury to leg treated",
            "Vitamin and mineral supplements given"
        ]

        vet_names = [
            "Dr. Brown",
            "Dr. Smith",
            "Dr. Johnson",
            "Dr. Patel",
            "Dr. Garcia",
            "Dr. Lee"
        ]

        feeds = ["Hay", "Grain", "Silage", "Mineral Supplement", "Protein Supplement", "Grass", "Alfalfa", "Barley", "Corn", "Oats"]  
        
        # Add animals, health records, production records, feeds and sales for each farmer
        for farmer in farmers:
            num_animals = random.randint(5, 10)  # Between 10-20 animals per farmer
            
            animals = []
            for j in range(num_animals):
                animal_name = fake.name()

                animal = Animal(
                    name=animal_name,
                    animal_type_id=random.choice(types).id,
                    age=random.randint(2, 8),
                    image=random.choice(animal_images),  
                    farmer_id=farmer.id,
                    health_status="Healthy",
                    birth_date=random_date_2019(),
                    breed=random.choice(dairy_breeds)
                )
                animals.append(animal)
            
            db.session.add_all(animals)
            db.session.commit()
                
            # For each animal, create health records, production records, and sales records
            for animal in animals:
                health_records = []
                for _ in range(5):  # At least 5 health records per animal
                    health_record = HealthRecord(
                        animal_id=animal.id,
                        checkup_date=random_date_2019(),
                        treatment=random.choice(treatments),
                        notes=random.choice(notes),
                        vet_name=random.choice(vet_names)
                    )
                    health_records.append(health_record)

                production_records = []
                for _ in range(15):  # At least 15 production records per animal
                    production_record = Production(
                        animal_id=animal.id,
                        product_type="Milk",
                        quantity=random.randint(15, 25),  # Random milk quantity
                        production_date=random_date_string_2021()
                    )
                    production_records.append(production_record)

                sales_records = []
                for _ in range(10):  # At least 10 sales records per animal
                    sale_record = Sale(
                        animal_id=animal.id,
                        product_type="Milk",
                        quantity_sold=random.randint(10, 20),
                        sale_date=random_date_string_2021(),
                        amount=random.uniform(100, 200)
                    )
                    sales_records.append(sale_record)

                feed_records = []
                for _ in range(10):
                    feed_record = Feed(
                        animal_id=animal.id,
                        feed_type=random.choice(feeds),
                        quantity=random.randint(5,20),
                        date=random_date_2019()
                    )
                    feed_records.append(feed_record)
                # Add records to the session
                db.session.add_all(health_records)
                db.session.add_all(production_records)
                db.session.add_all(sales_records)
                db.session.add_all(feed_records)

        # Commit the transaction
        db.session.commit()

        print("Database seeded successfully.")

if __name__ == '__main__':
    # Seed the data
    seed()
