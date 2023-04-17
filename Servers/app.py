from flask import Flask, request, make_response, jsonify, session
#from flask_cors import CORS
from flask_migrate import Migrate

from models import db, User

app = Flask(__name__)
app.secret_key = 1 #generate a secret key and encrypt it
#python -c 'import os; print(os.urandom(16))'
#this needs to be with postgres
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

#CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route('/login', methods=['POST'])
class Login():
    jsoned_request = request.get_json()
    user = User.query.filter(User.name == jsoned_request['name'].first())
    if user:
        session['user_id'] = user.id
        res = make_response(jsonify(user.to_dict()), 200)
        return res
    else:
        pass

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