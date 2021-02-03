import flask 

from flask import request, jsonify
from flask_cors import CORS

from stocks import get_stocks_infos
from tweets import get_tweets_text


app = flask.Flask(__name__)
app.config['DEBUG'] = True
CORS(app, support_credentials = True)

@app.route('/api/v1/resources/stocks', methods = ['GET'])
def get_stocks():

    response = None

    try:
        company_name = request.args['companyName']

        df_stocks_infos, currency, full_name = get_stocks_infos(company_name)

        response = {'date': list(df_stocks_infos.index.strftime('%Y-%m-%d')), 'close': list(df_stocks_infos['Close']), 'currency': currency, 'full_name': full_name}

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