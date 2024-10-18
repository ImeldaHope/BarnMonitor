from config import db, SerializerMixin

from sqlalchemy.orm import validates
from datetime import datetime


class Production(db.Model, SerializerMixin):
    __tablename__ = 'productions'

    serialize_rules = ('-animal.production','-sales.production',)

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    product_type = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    production_date = db.Column(db.String, nullable=False)

    # Relationships
    animal = db.relationship('Animal', back_populates='production')
    sales = db.relationship('Sale', back_populates='production', cascade='all, delete-orphan')

    # Validations
    @validates('product_type')
    def validate_product_type(self, key, value):
        if not value or not isinstance(value, str):
            raise ValueError("Product type must be a non-empty string.")
        return value

    @validates('quantity')
    def validate_quantity(self, key, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Quantity must be a non-negative integer.")
        return value

    @validates('production_date')
    def validate_production_date(self, key, value):
        try:
            # Ensure the date is in YYYY-MM-DD format
            datetime.strptime(value, "%Y-%m-%d")
        except ValueError:
            raise ValueError("Production date must be in the format YYYY-MM-DD.")
        return value

    def __repr__(self):
        return f'<Production {self.id} {self.product_type} {self.quantity}>'