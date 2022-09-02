from logging import NullHandler
from teebay import db

class User(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    first_name = db.Column(db.String(50),nullable=False)
    last_name = db.Column(db.String(50),nullable=False)
    address = db.Column(db.String(500))
    email = db.Column(db.String(100),nullable=False,unique=True)
    phone_number = db.Column(db.String(11))
    password = db.Column(db.String(100),nullable=False)


    def __repr__(self):
        return f'{self.email}'
    