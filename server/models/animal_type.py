from ..config import db, SerializerMixin
from sqlalchemy import Column, Integer, String

class AnimalType(db.Model, SerializerMixin):
    __tablename__ = 'animal_types'

    id = Column(Integer, primary_key=True, autoincrement=True)
    type_name = Column(String, nullable=False, unique=True)
    description = Column(String)

    # One-to-Many relationship with Animal (if you have animals linked to types)
    animals = db.relationship('Animal', back_populates='animal_type')

    def __repr__(self):
        return f"<AnimalType(id={self.id}, type_name='{self.type_name}', description='{self.description}')>"
