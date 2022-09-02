from teebay import app,db
from flask import Blueprint,request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
import uuid
import jwt
import datetime
from functools import wraps

auth = Blueprint("auth",__name__)
from .models import User

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "Bearer" in request.headers:
            token = request.headers['Bearer']
        if not token:
            return jsonify({"error":"User is unauthorized"})
        try:
            data = jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"])
            login_user = User.query.filter_by(public_id=data['public_id']).first()
            if not login_user:
                return jsonify({"error":"No User Found"})
        except Exception as e:
            return jsonify({"error":str(e)})
        return f(login_user,*args, **kwargs)
    return decorator


@auth.route("/sign-up",methods=["POST"])
def sign_up():
    data = request.get_json()
    print("DATA------",data)
    try:
        hash_password = generate_password_hash(data['password'],method="sha256")
        user = User(first_name=data['first_name'],last_name=data['last_name'],address=data['address'],email=data['email'],phone_number=data['phone_number'],password=hash_password,public_id=str(uuid.uuid4()))
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
        token = jwt.encode({"public_id":user.public_id,'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=4500)},app.config["SECRET_KEY"],"HS256")
        print('Token-------',token)
        return jsonify({
            "first_name":user.first_name,
            "last_name":user.last_name,
            "email":user.email,
            "token":token,
            "message":"You are logged in"
        })

@auth.route("/logout")
def logout():
    return "<h1>Logout....</h1>"