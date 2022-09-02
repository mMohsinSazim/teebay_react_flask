from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config["SECRET_KEY"] = "634d417b55f940be9b86ad65688d7b30"

from .views import views
from .auth import auth

app.register_blueprint(views,url_prefix="/api")
app.register_blueprint(auth,url_prefix="/api/user")