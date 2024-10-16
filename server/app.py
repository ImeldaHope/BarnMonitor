# server/app.py
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError

from models import Farmer, AnimalType, HealthRecord  # Import all models
from config import db  # Import the database (db) instance

app = Flask(__name__)
app.config.from_object('config.Config')  # Load configuration from config.py

bcrypt = Bcrypt(app)
migrate = Migrate(app, db)  # Initialize migrations
db.init_app(app)  # Initialize the database with the app


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    
    new_farmer = Farmer(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        password=hashed_password
    )
    
    try:
        db.session.add(new_farmer)
        db.session.commit()
        return jsonify({'message': 'Farmer signed up successfully!'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Email already exists!'}), 409


@app.route('/animal_types', methods=['GET'])
def get_animal_types():
    types = AnimalType.query.all()
    return jsonify([t.type_name for t in types])


@app.route('/animal_types', methods=['POST'])
def add_animal_type():
    data = request.get_json()
    new_type = AnimalType(type_name=data['type_name'], description=data.get('description', ''))
    db.session.add(new_type)
    db.session.commit()
    return jsonify({'message': 'Animal Type added successfully'})


@app.route('/health_records', methods=['GET'])
def get_health_records():
    records = HealthRecord.query.all()
    return jsonify([{
        'animal_id': r.animal_id,
        'checkup_date': r.checkup_date,
        'treatment': r.treatment,
        'vet_name': r.vet_name
    } for r in records])


@app.route('/health_records', methods=['POST'])
def add_health_record():
    data = request.get_json()
    new_record = HealthRecord(
        animal_id=data['animal_id'],
        checkup_date=data['checkup_date'],
        treatment=data['treatment'],
        vet_name=data['vet_name']
    )
    db.session.add(new_record)
    db.session.commit()
    return jsonify({'message': 'Health record added successfully'})


if __name__ == '__main__':
    app.run(debug=True)
