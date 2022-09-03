from teebay import app,db
from flask import Blueprint,request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
import uuid
import jwt
import datetime
from functools import wraps

auth = Blueprint("auth",__name__)
from .models import User

def tokenRequired(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "Bearer" in request.headers:
            token = request.headers['Bearer']
        if not token:
            return jsonify({"error":"User is unauthorized"})
        try:
            data = jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"])
            loginUser = User.query.filter_by(publicId=data['publicId']).first()
            if not loginUser:
                return jsonify({"error":"No User Found"})
        except Exception as e:
            return jsonify({"error":str(e)})
        return f(loginUser,*args, **kwargs)
    return decorator


@auth.route("/sign-up",methods=["POST"])
def signUp():
    data = request.get_json()
    print("DATA------",data)
    user = User.query.filter_by(email=data["email"]).first()
    print("USER______",user)
    if user:
        return jsonify({"message":"User with that email already exists"})
    try:
        hash_password = generate_password_hash(data['password'],method="sha256")
        user = User(firstName=data['firstName'],lastName=data['lastName'],address=data['address'],email=data['email'],phoneNumber=data['phoneNumber'],password=hash_password,publicId=str(uuid.uuid4()))
        db.session.add(user)
        db.session.commit()
        return jsonify({'message':'User was created'})
    except Exception as e:
        return jsonify({"error":str(e)})
        

@auth.route("/login",methods=["POST"])
def login():
    data = request.get_json()
    if not data or not data['email'] or not data['password']:
        return jsonify({"message":"Please provide email and password to login"})
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"message":"No user exists with that email"})
    if check_password_hash(user.password,data['password']):
        token = jwt.encode({"publicId":user.publicId,'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=4500)},app.config["SECRET_KEY"],"HS256")
        print('Token-------',token)
        return jsonify({
            "firstName":user.firstName,
            "lastName":user.lastName,
            "email":user.email,
            "token":token,
            "message":"You are logged in"
        })

@auth.route("/logout")
def logout():
    return "<h1>Logout....</h1>"