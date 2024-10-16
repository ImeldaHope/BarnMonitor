from ..config import db, SerializerMixin

class Production(db.Model, SerializerMixin):
    __tablename__ = 'productions'

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    product_type = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    production_date = db.Column(db.String, nullable=False)

    # Relationships
    animal = db.relationship('Animal', back_populates='production')
    sales = db.relationship('Sale', back_populates='production', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Production {self.id} {self.product_type} {self.quantity}>'
