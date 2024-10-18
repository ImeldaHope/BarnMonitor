from config import db, SerializerMixin, validates
from datetime import date

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    serialize_rules =('-farmer.animals','-animal_type.animals','-health_records.animal','-production.animal','-feed_records.animal','-sales.animal',)

    id= db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String, unique=True, nullable=False) 
    image= db.Column(db.String)   
    breed= db.Column(db.String)
    age= db.Column(db.Integer)    
    health_status= db.Column(db.String)
    birth_date= db.Column(db.String, nullable=False)

    farmer_id= db.Column(db.Integer,db.ForeignKey('farmers.id'))
    animal_type_id= db.Column(db.Integer,db.ForeignKey('animal_types.id'))

    farmer= db.relationship('Farmer', back_populates='animals')
    animal_type= db.relationship('AnimalType', back_populates='animals')
    health_records= db.relationship('HealthRecord', back_populates='animal', cascade='all, delete-orphan')
    production= db.relationship('Production', back_populates='animal', cascade='all, delete-orphan')
    feed_records = db.relationship('Feed', back_populates='animal', cascade='all, delete-orphan')
    sales = db.relationship('Sale', back_populates='animal', cascade='all, delete-orphan')

    @validates('birth_date')
    def validates_birth_date(self, key, dob):
        if dob >= date.today():
            raise ValueError("Date of birth cannot be in the future.")
        
        return dob
    
    def __repr__(self):
        return f'<Animal {self.id} {self.name} {self.breed}>'
