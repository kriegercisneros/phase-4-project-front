from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_`%(constraint_name)s`",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    })

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules=("-saved_pets.users_backref",)

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable = False)
    company_name = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String, nullable = False)
    email = db.Column(db.String, unique = True, nullable = False)
    location = db.Column(db.Integer)

    saved_pets=db.relationship('SavedPets', backref='users_backref')

class SavedPets(db.Model, SerializerMixin):
    __tablename__='saved_pets'

    serialize_rules=('-users_backref')

    id=db.Column(db.Integer, primary_key=True)
    dog_info=db.Column(db.String)
    shelter_info=db.Column(db.String)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))