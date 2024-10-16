from ..config import db, SerializerMixin

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

    def __repr__(self):
        return f'<Sale {self.id} {self.product_type} {self.quantity_sold}>'
