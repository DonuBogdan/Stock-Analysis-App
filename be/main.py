import flask 

from flask import request
from flask_cors import CORS

from get_stocks import get_stocks_infos


app = flask.Flask(__name__)
app.config['DEBUG'] = True
CORS(app, support_credentials = True)

@app.route('/api/v1/resources/stocks', methods = ['GET'])
def get_stocks():

    company_name = request.args['companyName']

    df_stocks_infos = get_stocks_infos(company_name)

    # avoid some problems regarding the index
    df_stocks_infos.index = df_stocks_infos.index.strftime('%Y-%m-%d')

    # jsonify the df
    df_response = df_stocks_infos.to_json(orient = 'index')

    return df_response

if __name__ == '__main__':
    app.run()