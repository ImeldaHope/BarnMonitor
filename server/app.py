# server/app.py
from flask import jsonify, make_response, request
from flask_bcrypt import Bcrypt
from flask_restful import Resource
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError

from models import Farmer, AnimalType, HealthRecord, Production, Sale, Animal  # Import all models
from config import db,app, api  


class Animals(Resource):
    def get(self):
        animals = [animal.to_dict() for animal in Animal.query.all()] 
        return jsonify(animals), 200

    def post(self):
        name = request.get_json()['name']
        breed = request.get_json()['breed']
        age = request.get_json()['age']
        health_status = request.get_json()['health_status']
        birth_date = request.get_json()['birth_date']

        new_animal = Animal(name=name, breed=breed, age=age, health_status=health_status, birth_date=birth_date)

        try:
            db.session.add(new_animal)
            db.session.commit()
        except ValueError as ve:
            return {'error': str(ve)}, 422
        except IntegrityError:
            return {'errors': '422 Unprocessable Entity'}, 422


        return make_response(jsonify(new_animal.to_dict()), 201)

api.add_resource(Animals,'/animals')

class AnimalById(Resource):
    def get(self, id):
        animal = Animal.query.filter_by(id=id).first()
        if animal:
            return animal.to_dict(), 200
        else:
            return make_response({"error": "Animal not found"}, 404)

    def patch(self, id):
        animal = Animal.query.filter_by(id=id).first()

        if not animal:
            return make_response(jsonify({"message": "Animal not found"}), 404)
        
        data = request.get_json()

        if 'name' in data:
            animal.name = data['name']
        if 'animal_type_id' in data:
            animal.animal_type_id = data['animal_type_id']
        if 'age' in data:
            animal.age = data['age']
        if 'farmer_id' in data:
            animal.farmer_id = data['farmer_id']
        if 'health_status' in data:
            animal.health_status = data['health_status']
        if 'birth_date' in data:
            animal.birth_date = data['birth_date']
        if 'breed' in data:
            animal.breed = data['breed']

        db.session.commit()

        return make_response(jsonify(animal.to_dict()), 200)

    def delete(self, id):
        animal = Animal.query.filter_by(id=id).first()

        db.session.delete(animal)
        db.session.commit()

        return make_response({"message":"no content"}, 204)

api.add_resource(AnimalById,'/animals/<int:id>')

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
