from teebay import db

class User(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    publicId = db.Column(db.String(500),nullable=False)
    firstName = db.Column(db.String(50),nullable=False)
    lastName = db.Column(db.String(50),nullable=False)
    address = db.Column(db.String(500))
    email = db.Column(db.String(100),nullable=False,unique=True)
    phoneNumber = db.Column(db.String(11))
    password = db.Column(db.String(100),nullable=False)


    def __repr__(self):
        return f'{self.email}'


    