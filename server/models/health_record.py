# server/models/health_record.py
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from config import db

class HealthRecord(db.Model):
    __tablename__ = 'health_records'

    id = Column(Integer, primary_key=True)
    animal_id = Column(Integer, ForeignKey('animals.id'), nullable=False)
    checkup_date = Column(DateTime, default=datetime.utcnow)
    treatment = Column(String, nullable=False)
    vet_name = Column(String, nullable=False)

    animal = relationship("Animal", back_populates="health_records")

    def to_dict(self):
        return {
            'id': self.id,
            'animal_id': self.animal_id,
            'checkup_date': self.checkup_date,
            'treatment': self.treatment,
            'vet_name': self.vet_name
        }

    def __repr__(self):
        return f"<HealthRecord(id={self.id}, animal_id={self.animal_id}, checkup_date='{self.checkup_date}', treatment='{self.treatment}', vet_name='{self.vet_name}')>"
