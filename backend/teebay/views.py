from teebay import db
from flask import Blueprint,jsonify,request
from .auth import tokenRequired
from .models import Product
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
            data = request.get_json()
            product = Product(title=data["title"],categories=data['categories'],description=data['description'],price=data['price'],rentPrice=data["rentPrice"],rentType=data['rentType'],userId=loginUser.id)
            db.session.add(product)
            db.session.commit()
            return jsonify({"message":"Product was created"})
        except Exception as e:
            return jsonify({"message":str(e)})
    
    products = Product.query.filter_by(userId=loginUser.id)
    allProducts = []
    for product in products:
        singleProduct = {}
        singleProduct['id'] = product.id
        singleProduct['title'] = product.title
        singleProduct['categories'] = product.categories
        singleProduct['description'] = product.description
        singleProduct['price'] = product.price
        singleProduct['rentPrice'] = product.rentPrice
        singleProduct['rentType'] = product.rentType
        allProducts.append(singleProduct)
    return jsonify({"data":allProducts})

@views.route("/product/<int:productId>",methods=["DELETE","PUT","GET"])
@tokenRequired
def getUpdateDeleteProduct(loginUser,productId,*args,**kwargs,):
    product = Product.query.filter_by(userId=loginUser.id,id=productId).first()
    if not product:
        return jsonify({"message":"Unauthorized user"})
    if request.method == "GET":
        singleProduct = {}
        singleProduct["id"] = product.id
        singleProduct['title'] = product.title
        singleProduct['categories'] = product.categories
        singleProduct['description'] = product.description
        singleProduct['price'] = product.price
        singleProduct['rentPrice'] = product.rentPrice
        singleProduct['rentType'] = product.rentType
        return jsonify({"data":singleProduct})
    if request.method == "PUT":
        data = request.get_json()
        product.title = data['title']
        product.categories = data['categories']
        product.description = data['description']
        product.price = data['price']
        product.rentPrice = data['rentPrice']
        product.rentType = data['rentType']
        db.session.commit()
        return jsonify({"data":"Product updated"})
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message":"Product deleted"})



        