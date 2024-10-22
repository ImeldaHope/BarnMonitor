from config import db, SerializerMixin
from werkzeug.security import generate_password_hash

class Farmer(db.Model, SerializerMixin):
    __tablename__ = 'farmers'

    serialize_rules = ('-animals.farmer',)  # Exclude farmer info from animals when serializing

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String)  # Optional address field
    password = db.Column(db.String, nullable=False)

    # One-to-Many relationship with Animal
    animals = db.relationship('Animal', back_populates='farmer', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Farmer {self.id} {self.name} {self.email}>'

    def to_dict(self):
        """
        Convert the Farmer instance into a dictionary.
        Exclude sensitive information like the password.
        """
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            # Note: password is not included in the dictionary for security
        }

    @staticmethod
    def create_farmer(name, email, phone, address, password):
        """
        Static method to create a new Farmer instance.
        The password is hashed before storing it in the database.
        """
        hashed_password = generate_password_hash(password)
        new_farmer = Farmer(
            name=name,
            email=email,
            phone=phone,
            address=address,
            password=hashed_password
        )
        
        # Save to the database
        db.session.add(new_farmer)
        db.session.commit()  # Commit the session to persist the changes

        return new_farmer  # Return the saved farmer
