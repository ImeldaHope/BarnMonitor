from config import db, SerializerMixin

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    id= db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String, unique=True, nullable=False)    
    breed= db.Column(db.String)
    age= db.Column(db.Integer)    
    health_status= db.Column(db.String)
    birth_date= db.Column(db.String)

    farmer_id= db.Column(db.Integer,db.ForeignKey('farmers.id'))
    animal_type_id= db.Column(db.Integer,db.ForeignKey('animal_types.id'))

    farmer= db.relationship('Farmer', back_populates='animals')
    animal_type= db.relationship('AnimalType', back_populates='animals')
    health_records= db.relationship('HealthRecord', back_populates='animal', cascade='all, delete-orphan')
    production= db.relationship('Production', back_populates='animal', cascade='all, delete-orphan')
    feed_records = db.relationship('Feed', back_populates='animal', cascade='all, delete-orphan')
    sales = db.relationship('Sale', back_populates='animal', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Animal {self.id} {self.name} {self.breed}>'
