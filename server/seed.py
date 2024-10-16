# server/seed.py
from models import db_session, AnimalType, HealthRecord, Farmer
from werkzeug.security import generate_password_hash
from datetime import date

def seed():
    # Add Animal Types
    cow_type = AnimalType(type_name="Cow", description="Domestic cows")
    chicken_type = AnimalType(type_name="Chicken", description="Domestic chickens")

    db_session.add(cow_type)
    db_session.add(chicken_type)

    # Add Farmers
    farmer1 = Farmer(name="John Doe", email="john@example.com", phone="123456789", 
                     password=generate_password_hash("password123", method='sha256'))
    
    db_session.add(farmer1)

    # Add Health Records
    health_record1 = HealthRecord(animal_id=1, checkup_date=date.today(), treatment="Vaccination", vet_name="Dr. Smith")
    db_session.add(health_record1)

    # Commit all changes to the DB
    db_session.commit()
    print("Database seeded successfully!")

if __name__ == '__main__':
    seed()
