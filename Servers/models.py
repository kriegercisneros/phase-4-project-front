from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

#these imports are used for password encryption
from sqlalchemy.ext.hybrid import hybrid_property
from services import bcrypt,db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules=("-saved_pets.users_backref", "-retreats.users_backref",)

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    company_name = db.Column(db.String, unique = True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, unique = True, nullable = False)
    # location = db.Column(db.String)
    shelter_id=db.Column(db.String)

    retreats=db.relationship("Retreat", backref='users_backref', cascade = "all, delete, delete-orphan")
    saved_pets=db.relationship('SavedPets', backref='users_backref', cascade = "all, delete, delete-orphan")

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

    serialize_rules=('-users_backref',"-pet_retreats.saved_pets_backref",)

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    name=db.Column(db.String)
    breed=db.Column(db.String)
    gender=db.Column(db.String)
    organization_id=db.Column(db.String)
    species=db.Column(db.String)
    photo=db.Column(db.String)
    petfinder_id=db.Column(db.Integer)

    pet_retreats=db.relationship("PetRetreat",backref="saved_pet_backref", cascade = "all,delete,delete-orphan")

class Retreat(db.Model, SerializerMixin):
    __tablename__='retreats'

    serialize_rules=('-pet_retreat_saved_pets.retreat_backref','-users_backref')

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    date=db.Column(db.String)
    location=db.Column(db.String)
    approved=db.Column(db.Boolean)
    
    pet_retreats_saved_pets=db.relationship('PetRetreat', backref='retreat_backref', cascade = "all,delete,delete-orphan")

class PetRetreat(db.Model, SerializerMixin):
    __tablename__='petRetreats'

    serialize_rules=('-retreat_backref', '-saved_pet_backref',)

    id=db.Column(db.Integer, primary_key=True)
    pet_id=db.Column(db.Integer, db.ForeignKey('saved_pets.id'))
    retreat_id=db.Column(db.Integer, db.ForeignKey('retreats.id'))

