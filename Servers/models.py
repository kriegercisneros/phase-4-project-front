from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

#these imports are used for password encryption
from sqlalchemy.ext.hybrid import hybrid_property
from services import bcrypt,db

# metadata = MetaData(naming_convention={
#     "ix": "ix_%(column_0_label)s",
#     "uq": "uq_%(table_name)s_%(column_0_name)s",
#     "ck": "ck_%(table_name)s_`%(constraint_name)s`",
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
#     "pk": "pk_%(table_name)s"
#     })

# db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules=("-saved_pets.users_backref",)

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable = False)
    company_name = db.Column(db.String, unique = True, nullable = False)
    #this needs to have an _ to set to private
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, unique = True, nullable = False)
    location = db.Column(db.Integer)
    #need to be connected
    shelter_id=db.Column(db.String)

    saved_pets=db.relationship('SavedPets', backref='users_backref')

    #a hybrid property is a property that can be accessed as either an instance attribute or a method call
    #basically like the getter function
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    #this is the setter function 
    @password_hash.setter
    def password_hash(self, password):
        #note we need the encode and decode in python 3 due to special characters
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash=password_hash.decode('utf-8')

    #create an auth route using bcrypt
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))
    



class SavedPets(db.Model, SerializerMixin):
    __tablename__='saved_pets'

    serialize_rules=('-users_backref',)

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    breed=db.Column(db.String)
    gender=db.Column(db.String)
    organization_id=db.Column(db.String)
    species=db.Column(db.String)
    photo=db.Column(db.String)
    petfinder_id=db.Column(db.Integer)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))