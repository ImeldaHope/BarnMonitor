from config import db, SerializerMixin   
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey 
from sqlalchemy.orm import relationship  

class Feed(db.Model, SerializerMixin):
    __tablename__ = 'feeds'  

    serialize_rules=('animal.feed_records',)
    
    id = Column(Integer, primary_key=True, autoincrement=True) 
    animal_id = Column(Integer, ForeignKey('animals.id'), nullable=False)  
    feed_type = Column(String, nullable=False)  
    quantity = Column(Integer, nullable=False)  
    date = Column(Date, nullable=False)  

    # Many-to-One relationship with Animal
    animal = relationship('Animal', back_populates='feed_records')  

    def __repr__(self):
        return f"<Feed(id={self.id}, animal_id={self.animal_id}, feed_type='{self.feed_type}', quantity={self.quantity}, date='{self.date}')>"

    def to_dict(self):
        return {
            'id': self.id,
            'animal_id': self.animal_id,
            'feed_type': self.feed_type,
            'quantity': self.quantity,
            'date': self.date.isoformat()  # Format date as ISO string for JSON serialization
        }
