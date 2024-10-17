# server/app.py
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError
from flask_restful import Api, Resource  # Import Flask-RESTful

from models import Farmer, AnimalType, HealthRecord, Production, Sale  # Import all models
from config import db,app  # Import the database (db) instance

# app = Flask(__name__)
# # app.config.from_object('config.Config')  # Load configuration from config.py

# bcrypt = Bcrypt(app)
# migrate = Migrate(app, db)  # Initialize migrations
# db.init_app(app)  # Initialize the database with the app

api = Api(app)  # Initialize Flask-RESTful API


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


# AnimalType Resource (CRUD for Animal Types)
class AnimalTypeResource(Resource):
    def get(self, id=None):
        if id:
            animal_type = AnimalType.query.get(id)
            if animal_type:
                return jsonify(animal_type.to_dict())
            return jsonify({'message': 'Animal Type not found'}), 404
        else:
            types = AnimalType.query.all()
            return jsonify([t.to_dict() for t in types])

    def post(self):
        data = request.get_json()
        new_type = AnimalType(type_name=data['type_name'], description=data.get('description', ''))
        db.session.add(new_type)
        db.session.commit()
        return jsonify({'message': 'Animal Type added successfully'})

    def put(self, id):
        animal_type = AnimalType.query.get(id)
        if animal_type:
            data = request.get_json()
            animal_type.type_name = data.get('type_name', animal_type.type_name)
            animal_type.description = data.get('description', animal_type.description)
            db.session.commit()
            return jsonify({'message': 'Animal Type updated successfully'})
        return jsonify({'message': 'Animal Type not found'}), 404

    def delete(self, id):
        animal_type = AnimalType.query.get(id)
        if animal_type:
            db.session.delete(animal_type)
            db.session.commit()
            return jsonify({'message': 'Animal Type deleted successfully'})
        return jsonify({'message': 'Animal Type not found'}), 404


# HealthRecord Resource (CRUD for Health Records)
class HealthRecordResource(Resource):
    def get(self, id=None):
        if id:
            health_record = HealthRecord.query.get(id)
            if health_record:
                return jsonify(health_record.to_dict())
            return jsonify({'message': 'Health Record not found'}), 404
        else:
            records = HealthRecord.query.all()
            return jsonify([r.to_dict() for r in records])

    def post(self):
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

    def put(self, id):
        health_record = HealthRecord.query.get(id)
        if health_record:
            data = request.get_json()
            health_record.animal_id = data.get('animal_id', health_record.animal_id)
            health_record.checkup_date = data.get('checkup_date', health_record.checkup_date)
            health_record.treatment = data.get('treatment', health_record.treatment)
            health_record.vet_name = data.get('vet_name', health_record.vet_name)
            db.session.commit()
            return jsonify({'message': 'Health record updated successfully'})
        return jsonify({'message': 'Health record not found'}), 404

    def delete(self, id):
        health_record = HealthRecord.query.get(id)
        if health_record:
            db.session.delete(health_record)
            db.session.commit()
            return jsonify({'message': 'Health record deleted successfully'})
        return jsonify({'message': 'Health record not found'}), 404


# Register API resources with their respective endpoints
api.add_resource(AnimalTypeResource, '/animal_types', '/animal_types/<int:id>')
api.add_resource(HealthRecordResource, '/health_records', '/health_records/<int:id>')



#Production Routes
@app.route('/productions', methods=['GET'])
def get_productions():
    productions = Production.query.all()
    return jsonify([{
        'id': p.id,
        'animal_id': p.animal_id,
        'product_type': p.product_type,
        'quantity': p.quantity,
        'production_date': p.production_date
    } for p in productions])

@app.route('/productions', methods=['POST'])
def add_production():
    data = request.get_json()
    new_production = Production(
        animal_id=data['animal_id'],
        product_type=data['product_type'],
        quantity=data['quantity'],
        production_date=data['production_date']
    )
    db.session.add(new_production)
    db.session.commit()
    return jsonify({'message': 'Production record added successfully'})

@app.route('/productions/<int:id>', methods=['PUT'])
def update_production(id):
    production = Production.query.get(id)
    if production:
        data = request.get_json()
        production.animal_id = data.get('animal_id', production.animal_id)
        production.product_type = data.get('product_type', production.product_type)
        production.quantity = data.get('quantity', production.quantity)
        production.production_date = data.get('production_date', production.production_date)
        db.session.commit()
        return jsonify({'message': 'Production record updated successfully'})
    return jsonify({'message': 'Production record not found'}), 404

@app.route('/productions/<int:id>', methods=['DELETE'])
def delete_production(id):
    production = Production.query.get(id)
    if production:
        db.session.delete(production)
        db.session.commit()
        return jsonify({'message': 'Production record deleted successfully'})
    return jsonify({'message': 'Production record not found'}), 404

# Sale Routes
@app.route('/sales', methods=['GET'])
def get_sales():
    sales = Sale.query.all()
    return jsonify([{
        'id': s.id,
        'animal_id': s.animal_id,
        'product_type': s.product_type,
        'quantity_sold': s.quantity_sold,
        'sale_date': s.sale_date,
        'amount': s.amount
    } for s in sales])

@app.route('/sales', methods=['POST'])
def add_sale():
    data = request.get_json()
    new_sale = Sale(
        animal_id=data['animal_id'],
        product_type=data['product_type'],
        quantity_sold=data['quantity_sold'],
        sale_date=data['sale_date'],
        amount=data['amount']
    )
    db.session.add(new_sale)
    db.session.commit()
    return jsonify({'message': 'Sale record added successfully'})

@app.route('/sales/<int:id>', methods=['PUT'])
def update_sale(id):
    sale = Sale.query.get(id)
    if sale:
        data = request.get_json()
        sale.animal_id = data.get('animal_id', sale.animal_id)
        sale.product_type = data.get('product_type', sale.product_type)
        sale.quantity_sold = data.get('quantity_sold', sale.quantity_sold)
        sale.sale_date = data.get('sale_date', sale.sale_date)
        sale.amount = data.get('amount', sale.amount)
        db.session.commit()
        return jsonify({'message': 'Sale record updated successfully'})
    return jsonify({'message': 'Sale record not found'}), 404

@app.route('/sales/<int:id>', methods=['DELETE'])
def delete_sale(id):
    sale = Sale.query.get(id)
    if sale:
        db.session.delete(sale)
        db.session.commit()
        return jsonify({'message': 'Sale record deleted successfully'})
    return jsonify({'message': 'Sale record not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
