# models/farmer.py
from config import db, SerializerMixin

class Farmer(db.Model, SerializerMixin):
    __tablename__ = 'farmers'

    serialize_rules=('-animals.farmer',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String)  # Add if needed
    password = db.Column(db.String, nullable=False)

    # One-to-Many relationship with Animal
    animals = db.relationship('Animal', back_populates='farmer', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Farmer {self.id} {self.name} {self.email}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'password': self.password  # Consider excluding sensitive data in the response
        }
