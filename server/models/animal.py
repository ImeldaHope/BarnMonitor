from ..config import db, SerializerMixin

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    id= db.Column(db.Integer)
    name= db.Column(db.String, unique=True, nullable=False)    
    breed= db.Column(db.String)
    age= db.Column(db.Integer)    
    health_status= db.Column(db.String)
    birth_date= db.Column(db.String)

    farmer_id= db.Column(db.Integer,db.ForeignKey('farmers.id'))
    animal_type_id= db.Column(db.Integer,db.ForeignKey('animals.id'))

    farmer= db.relationship('Farmer', back_populates='')
    type= db.relationship('AnimalType', back_populates='')
    health_records= db.relationship('HealthRecord', back_populates='', cascade='all, delete-orphan')
    production= db.relationship('Production', back_populates='', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Animal {self.id} {self.name} {self.breed}>'
