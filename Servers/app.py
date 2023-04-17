from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
#do i need to import Bcrypt here to because it is in the services file 
from flask_bcrypt import Bcrypt
from services import app,bcrypt,db
from models import db, User

import os
from dotenv import load_dotenv
load_dotenv()
#use os.environ.get() to get the data from the .env file
 
#this is now in services
# app = Flask(__name__)
print(os.environ.get("secretkey"))
app.secret_key = os.environ.get("secretkey")
#python -c 'import os; print(os.urandom(16))'
#this needs to be with postgres
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api=Api(app)

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method=='GET':
        users=[users.to_dict() for u in User.query.all()]
        print(users)
        return make_response(jsonify([users.to_dict() for u in User.query.all()]))

#Creates a login route that checks if the user exists
@app.route('/login', methods=['POST'])
def login():
    if request.method=='POST':
        jsoned_request = request.get_json()
        user = User.query.filter(User.email == jsoned_request['email'].first())
        if user.authenticate(jsoned_request["password"]):
            session['user_id'] = user.id
            return make_response(jsonify(user.to_dict()), 200)
        else:
            return make_response(jsonify({"login":"Invalid User"}), 500)
#save the user to a session 
#attempts to retrieve the user's info from the db using the ID.  if the user is found, info is returned as a json obj
@app.route('/checklogin', methods=['GET'])
def check_login():
    if request.method =='GET':
        user_id = session.get('user_id')
        if user_id:
            user=User.query.filter(User.id ==session['user_id']).first()
            return make_response(jsonify(user.to_dict()), 200)

#this is some basic code to validate or not whether or not a user is allowed to access specific resources
#we will use this for allowing the admin to see the requests from a user

@app.route('/gettype', methods=['GET'])
def get_type():
    if session.get("valid"):
        user=User.query.filter(User.id == session['user_id']).first()
        return make_response(jsonify({"user_type":user.user_type}), 200)
    else:
        return make_response(jsonify({"login" :"invalid user"}),400)

@app.before_request
def validate():
    if session["user_id"]:
        user = User.query.filter(User.id == session["user_id"]).first()
        if user.user_type == 'admin':
            session["valid"] = True
        else:
            session["valid"] = False
    else:
        session["valid"] = False

if __name__ == '__main__':
    app.run(port=5555)

# class OneSavedPet():
#     def get(self,id):
#         pass
#     def delete(self,id):
#         pass
#     def patch(self,id):
#         pass

# class AllSavedPets():
#     def get(self):
#         pass
#     def post(self):
#         pass

# api.add_resource(AllSavedPets,'/saved_pets')
# api.add_resource(OneSavedPet,'/saved_pets/<int:id>')