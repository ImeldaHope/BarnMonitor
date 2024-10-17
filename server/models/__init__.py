# server/models/__init__.py

# Import all models
from .animal import Animal
from .animal_type import AnimalType
from .farmer import Farmer
from .feed import Feed
from .health_record import HealthRecord
from .production import Production
from .sale import Sale

# Import the db instance from config
from config import db

# Register models with db to ensure they can be used with SQLAlchemy
__all__ = ['Animal', 'AnimalType', 'Farmer', 'Feed', 'HealthRecord', 'Production', 'Sale']

# This allows easier importing of models in other parts of the app
def register_models():
    models = [Animal, AnimalType, Farmer, Feed, HealthRecord, Production, Sale]
    for model in models:
        db.Model.metadata.create_all(db.engine)

