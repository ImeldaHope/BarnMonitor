from ..config import db, SerializerMixin

class AnimalType(db.Model, SerializerMixin):
    __tablename__ = 'animal_types'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type_name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String)

    animals = db.relationship('Animal', back_populates='animal_type')

    def __repr__(self):
        return f"<AnimalType(id={self.id}, type_name='{self.type_name}', description='{self.description}')>"
