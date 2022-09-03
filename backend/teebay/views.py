from cmath import exp
from flask import Blueprint,jsonify,request
from .auth import tokenRequired
views = Blueprint("views",__name__)

@views.route("/")
# @token_required
def home():
    try:
        return jsonify({"message":"hello world"})
    except Exception as e:
        return jsonify({"message":"Not Authorized"})

@views.route("/products",methods=["GET","POST"])
@tokenRequired
def getAddProduct(loginUser,*args,**kwargs):
    if request.method == "POST":
        try:
            pass
        except Exception as e:
            return jsonify({"message":str(e)})
    return jsonify({"message":"GET REQ"})


        