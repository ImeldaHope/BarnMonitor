from ..config import db, SerializerMixin
from sqlalchemy import Column, Integer, String, Date

class HealthRecord(db.Model, SerializerMixin):
    __tablename__ = 'health_records'

    id = Column(Integer, primary_key=True, autoincrement=True)
    animal_id = Column(Integer, db.ForeignKey('animals.id'), nullable=False)
    checkup_date = Column(Date, nullable=False)
    treatment = Column(String, nullable=False)
    vet_name = Column(String, nullable=False)

    # Many-to-One relationship with Animal
    animal = db.relationship('Animal', back_populates='health_records')

    def __repr__(self):
        return f"<HealthRecord(id={self.id}, animal_id={self.animal_id}, checkup_date='{self.checkup_date}', treatment='{self.treatment}', vet_name='{self.vet_name}')>"
