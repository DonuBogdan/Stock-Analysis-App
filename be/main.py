import flask 

from flask import request, jsonify
from flask_cors import CORS

from stocks import get_stocks_infos, get_all_matched_symbols, predict_next_day
from tweets import get_tweets_text


app = flask.Flask(__name__)
app.config['DEBUG'] = True
CORS(app, support_credentials = True)

# new

# from flask_sqlalchemy import SQLAlchemy

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postNegru123@@localhost:5432/stock_analysis_app_db'
# db = SQLAlchemy(app)


# end new


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