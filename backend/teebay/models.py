from teebay import db
from datetime import datetime
class User(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    publicId = db.Column(db.String(500),nullable=False)
    firstName = db.Column(db.String(50),nullable=False)
    lastName = db.Column(db.String(50),nullable=False)
    address = db.Column(db.String(500))
    email = db.Column(db.String(100),nullable=False,unique=True)
    phoneNumber = db.Column(db.String(11))
    password = db.Column(db.String(100),nullable=False)
    products = db.relationship('Product',backref="user")

    def __repr__(self):
        return f'{self.email}'

class Product(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    title = db.Column(db.String(200),unique=True)
    categories = db.Column(db.String(100),nullable=False)
    description = db.Column(db.Text)
    createdAt = db.Column(db.DateTime,default=datetime.utcnow)
    price = db.Column(db.Float,nullable=False)
    rentPrice = db.Column(db.Float,nullable=False)
    rentType = db.Column(db.String(20),nullable=False)
    userId = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)

    def __repr__(self):
        return f'{self.title}'




    