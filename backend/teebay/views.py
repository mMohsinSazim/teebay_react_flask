from flask import Blueprint,jsonify
from .auth import token_required
views = Blueprint("views",__name__)

@views.route("/")
# @token_required
def home():
    try:
        return jsonify({"message":"hello world"})
    except Exception as e:
        return jsonify({"message":"Not Authorized"})

        