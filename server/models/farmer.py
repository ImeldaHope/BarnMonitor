from ..config import db, SerializerMixin 
from sqlalchemy import Column, Integer, String  
from sqlalchemy.orm import relationship 

class Farmer(db.Model, SerializerMixin):
    __tablename__ = 'farmers'

    
    id = Column(Integer, primary_key=True, autoincrement=True) 
    name = Column(String, nullable=False)  
    email = Column(String, nullable=False, unique=True)  
    phone = Column(String, nullable=False)  
    address = Column(String, nullable=True)  
    password = Column(String, nullable=False)  

    # One-to-Many relationship with Animal
    animals = relationship('Animal', back_populates='farmer', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Farmer(id={self.id}, name='{self.name}', email='{self.email}', phone='{self.phone}')>"
