# server/app.py
from flask import jsonify, make_response, request
from flask_bcrypt import Bcrypt
from flask_restful import Resource
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError

from models import Farmer, AnimalType, HealthRecord, Production, Sale, Animal, Feed  # Import all models
from config import db, app, api  


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

api.add_resource(Animals, '/animals')

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

        return make_response({"message": "no content"}, 204)

api.add_resource(AnimalById, '/animals/<int:id>')


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


# Farmer Resource
class FarmerResource(Resource):
    def get(self, id=None):
        if id:
            farmer = Farmer.query.get(id)
            if farmer:
                return jsonify(farmer.to_dict())
            return jsonify({'message': 'Farmer not found'}), 404
        else:
            farmers = Farmer.query.all()
            return jsonify([f.to_dict() for f in farmers])

    def post(self):
        data = request.get_json()
        new_farmer = Farmer(
            name=data['name'],
            email=data['email'],
            phone=data['phone']
        )
        db.session.add(new_farmer)
        db.session.commit()
        return jsonify({'message': 'Farmer added successfully', 'farmer': new_farmer.to_dict()}), 201

    def delete(self, id):
        farmer = Farmer.query.get(id)
        if farmer:
            db.session.delete(farmer)
            db.session.commit()
            return jsonify({'message': 'Farmer deleted successfully'})
        return jsonify({'message': 'Farmer not found'}), 404

api.add_resource(FarmerResource, '/farmers', '/farmers/<int:id>')


# Feed Resource
class FeedResource(Resource):
    def get(self, id=None):
        if id:
            feed = Feed.query.get(id)
            if feed:
                return jsonify(feed.to_dict())
            return jsonify({'message': 'Feed not found'}), 404
        else:
            feeds = Feed.query.all()
            return jsonify([f.to_dict() for f in feeds])

    def post(self):
        data = request.get_json()
        new_feed = Feed(
            name=data['name'],
            type=data['type'],
            quantity=data['quantity'],
            price=data['price'],
            supplier=data.get('supplier', '')
        )
        db.session.add(new_feed)
        db.session.commit()
        return jsonify({'message': 'Feed added successfully', 'feed': new_feed.to_dict()}), 201

    def delete(self, id):
        feed = Feed.query.get(id)
        if feed:
            db.session.delete(feed)
            db.session.commit()
            return jsonify({'message': 'Feed deleted successfully'})
        return jsonify({'message': 'Feed not found'}), 404

api.add_resource(FeedResource, '/feeds', '/feeds/<int:id>')


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


# Production Routes
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
    return jsonify(new_production.to_dict()), 201

@app.route('/productions/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def production_by_id(id):
    production = Production.query.get(id)
    if not production:
        return jsonify({'message': 'Production not found'}), 404
    if request.method == 'GET':
        return jsonify(production.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()
        production.product_type = data.get('product_type', production.product_type)
        production.quantity = data.get('quantity', production.quantity)
        production.production_date = data.get('production_date', production.production_date)
        db.session.commit()
        return jsonify(production.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(production)
        db.session.commit()
        return jsonify({'message': 'Production deleted'})


# Sale Routes
@app.route('/sales', methods=['GET'])
def get_sales():
    sales = Sale.query.all()
    return jsonify([{
        'id': s.id,
        'animal_id': s.animal_id,
        'sale_date': s.sale_date,
        'quantity': s.quantity,
        'price': s.price
    } for s in sales])

@app.route('/sales', methods=['POST'])
def add_sale():
    data = request.get_json()
    new_sale = Sale(
        animal_id=data['animal_id'],
        sale_date=data['sale_date'],
        quantity=data['quantity'],
        price=data['price']
    )
    db.session.add(new_sale)
    db.session.commit()
    return jsonify(new_sale.to_dict()), 201

@app.route('/sales/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def sale_by_id(id):
    sale = Sale.query.get(id)
    if not sale:
        return jsonify({'message': 'Sale not found'}), 404
    if request.method == 'GET':
        return jsonify(sale.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()
        sale.quantity = data.get('quantity', sale.quantity)
        sale.price = data.get('price', sale.price)
        db.session.commit()
        return jsonify(sale.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(sale)
        db.session.commit()
        return jsonify({'message': 'Sale deleted'})

if __name__ == '__main__':
    with app.app_context():  
        db.create_all()  
    app.run(debug=True)