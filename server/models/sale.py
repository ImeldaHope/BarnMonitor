from config import db, SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime


class Sale(db.Model, SerializerMixin):
    __tablename__ = 'sales'

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    product_type = db.Column(db.String, nullable=False)
    quantity_sold = db.Column(db.Integer, nullable=False)
    sale_date = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    production_id = db.Column(db.Integer, db.ForeignKey('productions.id'))

    # Relationships
    animal = db.relationship('Animal', back_populates='sales')
    production = db.relationship('Production', back_populates='sales')

    # Validations
    @validates('product_type')
    def validate_product_type(self, key, value):
        if not value or not isinstance(value, str):
            raise ValueError("Product type must be a non-empty string.")
        return value

    @validates('quantity_sold')
    def validate_quantity_sold(self, key, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Quantity sold must be a non-negative integer.")
        return value

    @validates('sale_date')
    def validate_sale_date(self, key, value):
        try:
            # Ensure the date is in YYYY-MM-DD format
            datetime.strptime(value, "%Y-%m-%d")
        except ValueError:
            raise ValueError("Sale date must be in the format YYYY-MM-DD.")
        return value

    @validates('amount')
    def validate_amount(self, key, value):
        if not isinstance(value, (float, int)) or value < 0:
            raise ValueError("Amount must be a non-negative number.")
        return float(value)

    def __repr__(self):
        return f'<Sale {self.id} {self.product_type} {self.quantity_sold}>'
    