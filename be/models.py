from main import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_name = db.Column(db.String(25), unique = True, nullable = False)
    email = db.Column(db.String(100), unique = True, nullable = False)
    password = db.Column(db.String(50), nullable = False)

    def __repr__(self):
        return f"User('{self.user_name}', '{self.email}')"

db.create_all()