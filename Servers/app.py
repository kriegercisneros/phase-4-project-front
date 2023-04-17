from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
import requests

import os
from models import db, User

#HOW ARE WE GOING TO GENERATE AND SAVE A SECRET KEY 
app = Flask(__name__)
#app.secret_key = 1
#python -c 'import os; print(os.urandom(16))'
#this needs to be with postgres
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api=Api(app)

#Creates a login route that checks if th user exists
@app.route('/login', methods=['POST'])
def login():
    if request.method=='POST':
        jsoned_request = request.get_json()
        user = User.query.filter(User.email == jsoned_request['email'].first())
        if user:
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


@app.route('/test', methods=['GET'])
def test():
    if request.method =='GET':
        return make_response({}, 200)

#some boiler plate code for writing sessions
# @app.route('/sessions/<string:key>', methods=['GET'])
# def show_session(key):

#     session["hello"] = session.get("hello") or "World"
#     session["goodnight"] = session.get("goodnight") or "Moon"

#     response = make_response(jsonify({
#         'session': {
#             'session_key': key,
#             'session_value': session[key],
#             'session_accessed': session.accessed,
#         },
#         'cookies': [{cookie: request.cookies[cookie]}
#             for cookie in request.cookies],
#     }), 200)

#     response.set_cookie('mouse', 'Cookie')

#     return response


class OneSavedPet(Resource):
    def get(self,id):
        pass
    def delete(self,id):
        pass
    def patch(self,id):
        pass

class AllSavedPets(Resource):
    def get(self):
        pass
    def post(self):
        pass

class APICall(Resource):
    def get(self):
        url='https://api.petfinder.com/v2/animals?organization=co498'
        headers1={"Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJRbGZLY3I3aUlDcVV5RHR0NzY3VVpMUVFrZmVicFZIZnVhVjR6WTFZcHR3NXVIVFA1NyIsImp0aSI6IjI5NGEyZTI3NDgyNGYzMWE3NDg0ZjM0YmIzY2RmYWRhNWUxMzFjMTAyMDVkNjBhMGQ2NTkzN2IyYmMzNTlkY2IyYTA0ZWEwMzRkZDVmODk4IiwiaWF0IjoxNjgxNzY0MDY1LCJuYmYiOjE2ODE3NjQwNjUsImV4cCI6MTY4MTc2NzY2NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.AHD6Ngb6vPFKhfB6LV60iXbSLTC_37vkoKKEjTGbtUfc0HWCK-6-_NyRIEibAP4AvzfwkQ26JRsYA0oIG10JAbAaOOpVRYUbTjjYu1T9o_ybT_9nWAdrdCCIvXLSzLXkjvqm8Clc62wiJLYl2VVwU_Tw6yugZNjtiPB9QyC6wQ_wAeQckcK8BUKXm1xsGVzAaZeVPjtRW4ahvEwRrgOXdorvY5ykdUipHITU9lvmp36I2m48DTv8hgXscIIf-ISHK0DX_MrtRE7h1CRx1ZBLDnfbgku97nsE7qxN-cgiKMvTSCnBJeyFtIBOyEaagudRP7sfUfaEiscXUGxZbS8Tiw'}
        res=requests.get(url, headers=headers1)
        print(type(res.text))
        rb=make_response(res.text)
        rb.status_code=200
        rb.headers={'Content-Type':"application/json"}
        print(rb)
        return rb
    

def get_new_token():
    headers = {'Content-Type': 'application/x-www-form-urlencoded',}
    data = 'grant_type=client_credentials&client_id={CLIENT_ID}}&client_secret={CLIENT_SECRET}}'
    res = requests.post('https://api.petfinder.com/v2/oauth2/token', headers=headers, data=data)
    print(res.text)
    return make_response(res.text, 200)


        


api.add_resource(AllSavedPets,'/saved_pets')
api.add_resource(OneSavedPet,'/saved_pets/<int:id>')
api.add_resource(APICall,'/hello')


if __name__ == '__main__':
    app.run( port = 5555, debug = True )