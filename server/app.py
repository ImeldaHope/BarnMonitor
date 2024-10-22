# server/app.py
from flask import jsonify, make_response, request
from flask_bcrypt import Bcrypt
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from models import Farmer, AnimalType, HealthRecord, Production, Sale, Animal, Feed  # Import all models
from config import db, app, api  
import logging


class Animals(Resource):
    def get(self):
        animals = [animal.to_dict() for animal in Animal.query.all()]         
        return make_response(jsonify(animals), 200  )         
    
    def post(self):
        name = request.get_json()['name']
        breed = request.get_json()['breed']
        age = request.get_json()['age']
        health_status = request.get_json()['health_status']
        birth_date = request.get_json()['birth_date']
        image = request.get_json()['image']
        farmer_id = request.get_json()['farmer_id']
        animal_type_id = request.get_json()['animal_type_id']

        try:        
            birth_date = datetime.strptime(birth_date, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Please use YYYY-MM-DD'}), 400

        new_animal = Animal(name=name, breed=breed, age=age, health_status=health_status, birth_date=birth_date, image=image, farmer_id=farmer_id, animal_type_id=animal_type_id)

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

class LoginResource(Resource):
    def post(self):
        try:
            data = request.get_json()

            # Validate required fields
            required_fields = ['email', 'password']
            for field in required_fields:
                if field not in data:
                    return {'error': f'Missing field: {field}'}, 400  # Return error for missing fields

            # Check if the farmer exists
            farmer = Farmer.query.filter_by(email=data['email']).first()
            if not farmer:
                return {'error': 'Invalid email or password'}, 401  # Unauthorized

            # Check password
            if not check_password_hash(farmer.password, data['password']):
                return {'error': 'Invalid email or password'}, 401  # Unauthorized

            # Return success message with farmer details (excluding password)
            return {
                'message': 'Login successful!',
                'farmer': {
                    'id': farmer.id,
                    'name': farmer.name,
                    'email': farmer.email,
                    'phone': farmer.phone,
                    'address': farmer.address,
                }
            }, 200  # OK

        except Exception as e:
            # Handle any other exceptions
            return {'error': 'Failed to log in', 'details': str(e)}, 500
api.add_resource(LoginResource, '/login')

class SignupResource(Resource):
    def post(self):
        try:
            data = request.get_json()

            # Validate required fields
            required_fields = ['name', 'email', 'phone', 'password', 'address']  
            for field in required_fields:
                if field not in data:
                    return {'error': f'Missing field: {field}'}, 400  # Return error for missing fields

            # Check if the farmer already exists
            existing_farmer = Farmer.query.filter_by(email=data['email']).first()
            if existing_farmer:
                return {'error': 'Farmer with this email already exists.'}, 409  # Conflict

            # Create a new farmer instance
            new_farmer = Farmer(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                address=data['address'],
                password=generate_password_hash(data['password'])  # Hash the password
            )

            # Add to the database
            db.session.add(new_farmer)
            db.session.commit()

            return {
                'message': 'Farmer signed up successfully!',
                'farmer': new_farmer.to_dict()  # Call the to_dict method for response
            }, 201  # Created

        except KeyError as e:
            # Handle missing fields
            return {'error': f'Missing field: {str(e)}'}, 400
        except Exception as e:
            # Handle any other exceptions and roll back
            db.session.rollback()
            return {'error': 'Failed to sign up farmer', 'details': str(e)}, 500

class FarmerResource(Resource):
    def get(self, id=None):
        if id:
            # Fetch a specific farmer by ID
            farmer = Farmer.query.get(id)
            if farmer:
                farmer_data = farmer.to_dict()
                farmer_data['animals'] = [animal.to_dict() for animal in farmer.animals]  # Assuming animals is a relationship
                return farmer_data, 200  # Return dict directly with 200 status
            return {'message': 'Farmer not found'}, 404  # Return a simple dict
        else:
            # Fetch all farmers
            farmers = Farmer.query.all()
            return [f.to_dict() for f in farmers], 200  # Return list of dicts directly

    def delete(self, id):
        farmer = Farmer.query.get(id)
        if farmer:
            db.session.delete(farmer)
            db.session.commit()
            return {'message': 'Farmer deleted successfully'}, 200  # Return success message
        return {'message': 'Farmer not found'}, 404  # Return error message if farmer not found





# Register the resources with the API
api.add_resource(SignupResource, '/signup')
api.add_resource(FarmerResource, '/farmers', '/farmers/<int:id>')

class FeedResource(Resource):
    
    # GET request handler
    def get(self, id=None):
        if id:
            feed = Feed.query.get(id)
            if feed:
                return jsonify(feed.to_dict())
            return jsonify({'message': 'Feed not found'}), 404
        else:
            feeds = Feed.query.all()
            return jsonify([f.to_dict() for f in feeds])
    
    # POST request handler
    def post(self):
        data = request.get_json()

        # Convert date string to a Python date object
        from datetime import datetime
        date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()

        new_feed = Feed(
            animal_id=data['animal_id'],
            date=date_obj,
            quantity=data['quantity'],
            feed_type=data['feed_type']
        )
        db.session.add(new_feed)
        db.session.commit()

        return make_response(jsonify(new_feed.to_dict()), 201)
    
    # DELETE request handler
    def delete(self, id):
        feed = Feed.query.get(id)
        if feed:
            db.session.delete(feed)
            db.session.commit()
            return jsonify({'message': 'Feed deleted successfully'})
        return jsonify({'message': 'Feed not found'}), 404


# Register the FeedResource with multiple routes
api.add_resource(FeedResource, '/feeds', '/feeds/<int:id>')


# AnimalType Resource (CRUD for Animal Types)
class AnimalTypeResource(Resource):
    def get(self, id=None):
        if id:
            animal_type = AnimalType.query.get(id)
            if animal_type:
                return jsonify(animal_type.to_dict())
            return jsonify({'message': f'Animal Type with ID {id} does not exist'}), 404
        else:
            types = AnimalType.query.all()
            return jsonify([t.to_dict() for t in types])

    def post(self):
        try:
            data = request.get_json()
            new_type = AnimalType(type_name=data['type_name'], description=data.get('description', ''))
            db.session.add(new_type)
            db.session.commit()
            return jsonify({'message': 'Animal Type added successfully'})
        except Exception as e:
            return jsonify({'message': 'Error adding Animal Type', 'error': str(e)}), 500

    def put(self, id):
        animal_type = AnimalType.query.get(id)
        if animal_type:
            data = request.get_json()
            animal_type.type_name = data.get('type_name', animal_type.type_name)
            animal_type.description = data.get('description', animal_type.description)
            db.session.commit()
            return jsonify({'message': 'Animal Type updated successfully'})
        return jsonify({'message': f'Animal Type with ID {id} does not exist'}), 404

    def patch(self, id):
        animal_type = AnimalType.query.get(id)
        if animal_type:
            data = request.get_json()
            if 'type_name' in data:
                animal_type.type_name = data['type_name']
            if 'description' in data:
                animal_type.description = data['description']
            db.session.commit()
            return jsonify({'message': 'Animal Type partially updated'})
        return jsonify({'message': f'Animal Type with ID {id} does not exist'}), 404

    def delete(self, id):
        animal_type = AnimalType.query.get(id)
        if animal_type:
            db.session.delete(animal_type)
            db.session.commit()
            return jsonify({'message': 'Animal Type deleted successfully'})
        return jsonify({'message': f'Animal Type with ID {id} does not exist'}), 404


# HealthRecord Resource (CRUD for Health Records)
class HealthRecordResource(Resource):
    def get(self, id=None):
        if id:
            health_record = HealthRecord.query.get(id)
            if health_record:
                return jsonify(health_record.to_dict())
            return jsonify({'message': f'Health Record with ID {id} does not exist'}), 404
        else:
            records = HealthRecord.query.all()
            return jsonify([r.to_dict() for r in records])
        
    def post(self):
        try:
            data = request.get_json()

            # Convert checkup_date from string to datetime object
            checkup_date = datetime.strptime(data['checkup_date'], '%Y-%m-%d')

            new_record = HealthRecord(
                animal_id=data['animal_id'],
                checkup_date=checkup_date,
                treatment=data['treatment'],
                notes=data.get('notes', ''),  # Optional field
                vet_name=data['vet_name']
            )

            db.session.add(new_record)
            db.session.commit()

            return jsonify({'message': 'Health record added successfully', 'record': new_record.to_dict()})
        except KeyError as e:
            return jsonify({'error': f'Missing key: {str(e)}'}), 400
        except ValueError as e:
            return jsonify({'error': f'Invalid date format: {str(e)}'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500    

    def put(self, id):
        health_record = HealthRecord.query.get(id)
        if health_record:
            try:
                data = request.get_json()

                # Convert checkup_date from string to datetime object
                if 'checkup_date' in data:
                    health_record.checkup_date = datetime.strptime(data['checkup_date'], '%Y-%m-%d')

                # Update other fields
                health_record.animal_id = data.get('animal_id', health_record.animal_id)
                health_record.treatment = data.get('treatment', health_record.treatment)
                health_record.notes = data.get('notes', health_record.notes)
                health_record.vet_name = data.get('vet_name', health_record.vet_name)

                db.session.commit()

                # Always return a proper JSON response
                return jsonify({'message': 'Health record updated successfully', 'record': health_record.to_dict()}), 200

            except ValueError as e:
                return jsonify({'error': f'Invalid date format: {str(e)}'}), 400
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        else:
            return jsonify({'message': f'Health Record with ID {id} does not exist'}), 404

    def patch(self, id):
        health_record = HealthRecord.query.get(id)
        if health_record:
            try:
                data = request.get_json()

                # Update only the fields that are in the request
                if 'checkup_date' in data:
                    health_record.checkup_date = datetime.strptime(data['checkup_date'], '%Y-%m-%d')

                if 'animal_id' in data:
                    health_record.animal_id = data['animal_id']
                if 'treatment' in data:
                    health_record.treatment = data['treatment']
                if 'notes' in data:
                    health_record.notes = data['notes']
                if 'vet_name' in data:
                    health_record.vet_name = data['vet_name']

                db.session.commit()

                return jsonify({'message': 'Health record partially updated', 'record': health_record.to_dict()}), 200

            except ValueError as e:
                return jsonify({'error': f'Invalid date format: {str(e)}'}), 400
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        else:
            return jsonify({'message': f'Health Record with ID {id} does not exist'}), 404


    def delete(self, id):
        health_record = HealthRecord.query.get(id)
        if health_record:
            db.session.delete(health_record)
            db.session.commit()
            return jsonify({'message': 'Health record deleted successfully'})
        return jsonify({'message': f'Health Record with ID {id} does not exist'}), 404


# Register API resources with their respective endpoints
api.add_resource(AnimalTypeResource, '/animal_types', '/animal_types/<int:id>')
api.add_resource(HealthRecordResource, '/health_records', '/health_records/<int:id>')




# Production Routes
class ProductionResource(Resource):
    def get(self, id=None):
        if id:
            production = Production.query.get(id)
            if production:
                return jsonify(production.to_dict())
            return jsonify({'message': 'Production record not found'}), 404
        else:
            productions = Production.query.all()
            return jsonify([p.to_dict() for p in productions])

    def post(self):
        data = request.get_json()
        new_production = Production(
            animal_id=data['animal_id'],
            product_type=data['product_type'],
            quantity=data['quantity'],
            production_date=data['production_date']
        )
        db.session.add(new_production)
        db.session.commit()
        return jsonify(new_production.to_dict()), 201, 201

    def patch(self, id):
        production = Production.query.get(id)
        if not production:
            return jsonify({'message': 'Production record not found'}), 404
        
        data = request.get_json()
        if 'animal_id' in data:
            production.animal_id = data['animal_id']
        if 'product_type' in data:
            production.product_type = data['product_type']
        if 'quantity' in data:
            production.quantity = data['quantity']
        if 'production_date' in data:
            production.production_date = data['production_date']

        db.session.commit()
        return jsonify({'message': 'Production record updated successfully'}), 200

    def delete(self, id):
        production = Production.query.get(id)
        if production:
            db.session.delete(production)
            db.session.commit()
            return jsonify({'message': 'Production record deleted successfully'})
        return jsonify({'message': 'Production record not found'}), 404
    
# Sale Routes
class SaleResource(Resource):
    def get(self, id=None):
        if id:
            sale = Sale.query.get(id)
            if sale:
                return jsonify(sale.to_dict())
            return jsonify({'message': 'Sale record not found'}), 404
        else:
            sales = Sale.query.all()
            return jsonify([s.to_dict() for s in sales])

    def post(self):
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
        return jsonify({'message': 'Sale record added successfully'}), 201

    def patch(self, id):
        sale = Sale.query.get(id)
        if not sale:
            return jsonify({'message': 'Sale record not found'}), 404
        
        data = request.get_json()
        if 'animal_id' in data:
            sale.animal_id = data['animal_id']
        if 'product_type' in data:
            sale.product_type = data['product_type']
        if 'quantity_sold' in data:
            sale.quantity_sold = data['quantity_sold']
        if 'sale_date' in data:
            sale.sale_date = data['sale_date']
        if 'amount' in data:
            sale.amount = data['amount']

        db.session.commit()
        return jsonify({'message': 'Sale record updated successfully'}), 200

    def delete(self, id):
        sale = Sale.query.get(id)
        if sale:
            db.session.delete(sale)
            db.session.commit()
            return jsonify({'message': 'Sale record deleted successfully'})
        return jsonify({'message': 'Sale record not found'}), 404

# Register API resources
api.add_resource(ProductionResource, '/productions', '/productions/<int:id>')
api.add_resource(SaleResource, '/sales', '/sales/<int:id>')


if __name__ == '__main__':
    with app.app_context():  
        db.create_all()  
    app.run(debug=True)