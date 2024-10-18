# server/models/health_record.py
from config import db, SerializerMixin
from datetime import datetime

class HealthRecord(db.Model, SerializerMixin):
    __tablename__ = 'health_records'

    serialize_rules=('-animal.health_records',)

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    checkup_date = db.Column(db.DateTime)
    treatment = db.Column(db.String, nullable=False)
    notes= db.Column(db.String)
    vet_name = db.Column(db.String, nullable=False)

    animal = db.relationship("Animal", back_populates="health_records")

    def to_dict(self):
        return {
            'id': self.id,
            'animal_id': self.animal_id,
            'checkup_date': self.checkup_date.strftime('%Y-%m-%d'),
            'treatment': self.treatment,
            'vet_name': self.vet_name,
            # Exclude the 'animal' relationship to prevent recursion
        }

    def __repr__(self):
        return f"<HealthRecord(id={self.id}, animal_id={self.animal_id}, checkup_date='{self.checkup_date}', treatment='{self.treatment}', vet_name='{self.vet_name}')>"
