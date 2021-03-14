import os
import jwt
import datetime

from main import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), unique = True, nullable = False)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    email = db.Column(db.String(100), unique = True, nullable = False)
    password = db.Column(db.String(50), nullable = False)

    def __init__(self, username, first_name, last_name, email, password):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days = 0, seconds = 45), # expiration date of the token
                'iat': datetime.datetime.utcnow(), # the time the token is generated
                'sub': user_id # the subject of the token (the user whom it identifies)
            }

            return jwt.encode(
                payload, 
                '\x1a\x12\xa2\xc5tW\\\xf5d\xf7a\xfd\x06\x11\xbcB\xaa\xd6\x1e\x95"\xd7\x0c\xb5', # secret key (secret key must be random and only accessible server-side)
                algorithm = 'HS256'
            )
            
        except Exception as e:
            return e

    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, '\x1a\x12\xa2\xc5tW\\\xf5d\xf7a\xfd\x06\x11\xbcB\xaa\xd6\x1e\x95"\xd7\x0c\xb5', algorithms = ['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            print('Here')
            return 'Invalid token. Please log in again.'

    def __repr__(self):
        return f"User('{self.user_name}', '{self.email}')"