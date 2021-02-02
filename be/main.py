import flask 

from flask import request, jsonify
from flask_cors import CORS

from get_stocks import get_stocks_infos


app = flask.Flask(__name__)
app.config['DEBUG'] = True
CORS(app, support_credentials = True)

@app.route('/api/v1/resources/stocks', methods = ['GET'])
def get_stocks():

    response = None

    try:
        company_name = request.args['companyName']

        df_stocks_infos = get_stocks_infos(company_name)

        response = {'date': list(df_stocks_infos.index.strftime('%Y-%m-%d')), 'close': list(df_stocks_infos['Close'])}

    except:
        response = {'error': 'Server error.'}

    return jsonify(response)

if __name__ == '__main__':
    app.run()