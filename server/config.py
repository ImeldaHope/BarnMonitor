from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from flask_session import Session
from datetime import timedelta

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata=MetaData(naming_convention=convention)
db=SQLAlchemy(metadata=metadata)

app=Flask(__name__)

app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///barnmonitor.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.config['SESSION_TYPE'] = 'filesystem'  
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)
app.config['SESSION_USE_SIGNER'] = True  
app.config['SESSION_FILE_DIR'] = './flask_session/' 
app.config['SESSION_COOKIE_SAMESITE'] = 'None' 
app.config['SESSION_FILE_THRESHOLD'] = 100  
app.config['SESSION_COOKIE_NAME'] = 'barnmonitor_session'
Session(app)

CORS(app, supports_credentials=True, secure=True, methods=["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],resources={r"/*": {"origins": "https://barnmonitor.vercel.app"}})

migrate=Migrate(app, db)
db.init_app(app)

bcrypt=Bcrypt(app)
api=Api(app)