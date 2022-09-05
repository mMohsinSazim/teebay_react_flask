from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
app = Flask(__name__)
app.config["SECRET_KEY"] = "634d417b55f940be9b86ad65688d7b30"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://@localhost/teebay_postgres"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
migrate = Migrate(app,db)

from .views import views
from .auth import auth

app.register_blueprint(views,url_prefix="/api")
app.register_blueprint(auth,url_prefix="/api/user")

from .models import *