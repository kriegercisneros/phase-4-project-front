from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
import requests
from models import db, SavedPets, User
from flask_bcrypt import Bcrypt
from services import app,bcrypt,db
import os
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)


load_dotenv()
#use os.environ.get() to get the data from the .env file

#this is now in services

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

@app.route('/')
def index():
    return make_response(
        {"message": "Hello Jackie!"}
    )
#gets all of the user info and creates a user
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method=='GET':
        u=User.query.all()
        user_dict_list=[users.to_dict() for users in u]
        print(user_dict_list)
        return make_response(jsonify(user_dict_list), 200)
    if request.method =='POST':
        data=request.get_json()
        print(data)
        try:
            user = User(
                type=data['type'],
                company_name=data['company_name'],
                # password=data['password'],
                email=data['email'],
                location=int(data['location']), 
                shelter_id=data['shelter_id']
            )
            print(user)
            user.password_hash = data['password']
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            return make_response({"errors": [e.__str__()]}, 422)
        
        return make_response(jsonify(user.to_dict()), 201)

#Creates a login route that checks if the user exists
@app.route('/login', methods=['POST'])
def login():
    if request.method=='POST':
        jsoned_request = request.get_json()
        user = User.query.filter(User.email == jsoned_request['email']).first()
        if user.authenticate(jsoned_request["password"]):
            session["user_id"] = user.id
            return make_response(jsonify(user.to_dict()), 200)
        else:
            return make_response(jsonify({"login":"Invalid User"}), 500)
        
# #save the user to a session 
# #attempts to retrieve the user's info from the db using the ID.  if the user is found, info is returned as a json obj
@app.route('/checklogin', methods=['GET'])
def check_login():
    if request.method =='GET':
        user_id = session.get('user_id')
        if user_id:
            user=User.query.filter(User.id ==session['user_id']).first()
            return make_response(jsonify(user.to_dict()), 200)
    return make_response({"message":"login checked"})

# #this is some basic code to validate or not whether or not a user is allowed to access specific resources
# #we will use this for allowing the admin to see the requests from a user

@app.route('/logout', methods=['DELETE'])
def logout():
    session['user_id']=None
    return make_response(jsonify({"login":"loggedout"}),200)

@app.route('/gettype', methods=['GET'])
def get_type():
    if session.get("valid"):
        user=User.query.filter(User.id == session['user_id']).first()
        return make_response(jsonify({"user_type":user.type}), 200)
    else:
        return make_response(jsonify({"login" :"invalid user"}),400)
    

@app.before_request
def validate():
    if 'user_id' in session:
        user = User.query.filter(User.id == session["user_id"]).first()
        if user and user.type == 'user':
            session["valid"] = True
        else:
            session["valid"] = False
    else:
        session["valid"] = False


#     response.set_cookie('mouse', 'Cookie')

#     return response


class OneSavedPet(Resource):
    def get(self,id):
        pass
    def delete(self,id):
        pass
    def patch(self,id):
        pass

#####################################
## SOMETHING IS BREAKING IN THE POST
#####################################

class AllSavedPets(Resource):
    def get(self):
        pass
    def post(self):
        data=request.get_json()
        newPet=SavedPets(dog_info=data['dog_info'], shelter_info=data['shelter_info'])
        db.session.add(newPet)
        db.session.commit()
        print(newPet)
        print(data)
        return make_response(newPet.to_dict(),200)

class APICall(Resource):
    def get(self):
        token=get_new_token()
        url='https://api.petfinder.com/v2/animals?organization=co52'
        headers1={"Authorization": f'Bearer {token}'}
        res=requests.get(url, headers=headers1)
        rb=make_response(res.text)
        rb.status_code=200
        rb.headers={'Content-Type':"application/json"}
        return rb
    

def get_new_token():
    headers = {'Content-Type': 'application/x-www-form-urlencoded',}
    data = f'grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}'
    res = requests.post('https://api.petfinder.com/v2/oauth2/token', headers=headers, data=data)
    rs=res.json()
    return (rs['access_token'])
    
    
api.add_resource(AllSavedPets,'/saved_pets')
api.add_resource(OneSavedPet,'/saved_pets/<int:id>')
api.add_resource(APICall,'/petfinder_api_call')


if __name__ == '__main__':
    app.run( port = 5555, debug = True )

