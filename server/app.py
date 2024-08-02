from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('config.Config')  # Import config

db = SQLAlchemy(app)
migrate = Migrate(app, db)

import models  # Import your models here to register them with SQLAlchemy

if __name__ == '__main__':
    app.run(debug=True)
