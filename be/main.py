import flask 

from flask import request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from stocks import get_stocks_infos, get_all_matched_symbols, predict_next_day
from tweets import get_tweets_text

from models import *


app = flask.Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postNegru123@@localhost:5432/stock_analysis_app_db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, support_credentials = True)

@app.route('/api/v1/resources/register', methods = ['POST'])
def register():

    if request.method == 'POST':

        request_data = request.get_json()
        
        # check if user already exists
        user = User.query.filter_by(username = request_data['username']).first()

        if not user:

            try:
            
                username = request_data['username']
                first_name = request_data['firstName']
                last_name = request_data['lastName']
                email = request_data['email']
                password = request_data['password']
                hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

                user = User(username = username, first_name = first_name, last_name = last_name, 
                            email = email, password = hashed_password)

                # insert the user
                db.session.add(user)
                db.session.commit()

                response_obj = {
                    'status': 'success',
                    'message': 'Successfully registered.'
                }

                return jsonify(response_obj)

            except Exception as e:
                response_obj = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }

                return jsonify(response_obj)
        else:
            response_obj = {
                'status': 'fail',
                'message': 'User already exists. Please Log in.',
            }

            return jsonify(response_obj)

@app.route('/api/v1/resources/login', methods = ['POST'])
def login():
    request_data = request.get_json()
            
    try:

        username = request_data['username']
        password = request_data['password']

        user = User.query.filter_by(username = username).first()

        if user and bcrypt.check_password_hash(user.password, password):

            auth_token = user.encode_auth_token(user.id)

            response_obj = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'auth_token': auth_token
            }

            return jsonify(response_obj)

        else:
            response_obj = {
                'status': 'fail',
                'message': 'User does not exist or password is wrong.'
            }

            return jsonify(response_obj)

    except Exception as e:

        print(e)

        response_obj = {
            'status': 'fail',
            'message': 'Try again'
        }

        return jsonify(response_obj)

@app.route('/api/v1/resources/status', methods = ['GET'])
def get_status():
    # get the auth token
    auth_header = request.headers.get('Authorization')
    
    if auth_header:
        auth_token = auth_header.split(' ')[1]
    else:
        auth_token = ''

    if auth_token:

        # we should get an user id
        resp = User.decode_auth_token(auth_token)

        if not isinstance(resp, str):

            user = User.query.filter_by(id = resp).first()
            
            response_obj = {
                'status': 'success',
                'data': {
                    'user_id': user.id,
                    'email': user.email
                    }
            }

            return jsonify(response_obj)

        response_obj = {
            'status': 'fail',
            'message': resp
        }

        return jsonify(response_obj)

    else:

        response_obj = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
            
        return jsonify(response_obj)

@app.route('/api/v1/resources/symbols', methods = ['GET'])
def get_symbols():

    response = None

    try:

        search_text = request.args['searchText']

        df = get_all_matched_symbols(search_text)

        response = []

        for idx, row in df.iterrows():
            response.append({'symbol': row['Symbol'], 'name': row['Name']})

    except: 
        response = {'error': 'Server error.'}

    return jsonify(response)

@app.route('/api/v1/resources/stocks', methods = ['GET'])
def get_stocks():

    response = None

    try:
        company_symbol = request.args['companyName']

        df_stocks_infos, currency, full_name, business_summary = get_stocks_infos(company_symbol)

        list_dates = list(df_stocks_infos.index.strftime('%Y-%m-%d'))
        list_closing_prices = list(df_stocks_infos['Close'])

        predicted_price, prediction_date = predict_next_day(company_symbol)

        list_dates.append(prediction_date)
        list_closing_prices.append(predicted_price)

        response = {'date': list_dates, 'close': list_closing_prices, 'currency': currency, 'full_name': full_name, 'business_summary': business_summary}

    except:
        response = {'error': 'Server error.'}

    return jsonify(response)

@app.route('/api/v1/resources/tweets', methods = ['GET'])
def get_tweets():

    company_name = request.args['companyName']

    list_of_tweets = get_tweets_text(company_name)

    return jsonify({'tweets': list_of_tweets})


if __name__ == '__main__':
    app.run()