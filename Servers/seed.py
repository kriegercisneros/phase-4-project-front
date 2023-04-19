#!/usr/bin/env python3

from app import app 
from models import db, User, SavedPets

# from faker import Faker
# from random import randint
# faker = Faker()

with app.app_context():
    print("Deleting Users...")
    SavedPets.query.delete()
    User.query.delete()
    
    print("Creating users...")
    new_user_1 = User(company_name="Mountain Ski Lodge",type="user", email='hi@mail.com', password_hash="notEncrypted")
    new_user_2 = User(company_name="Ocean Surf Resort",type="user", email='hih@mail.com', password_hash="notEncrypted")
    new_user_3 = User(company_name="Up In Da Sky",type="user", email='hid@mail.com', password_hash="notEncrypted")
    users = [new_user_1,new_user_2,new_user_3]
    db.session.add_all(users)
    db.session.commit()