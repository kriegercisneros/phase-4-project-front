from flask import Flask, request, make_response, jsonify, session
#from flask_cors import CORS
from flask_migrate import Migrate
import os
from models import db, User

#HOW ARE WE GOING TO GENERATE AND SAVE A SECRET KEY 
app = Flask(__name__)
app.secret_key = 
#python -c 'import os; print(os.urandom(16))'
#this needs to be with postgres
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

#CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

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