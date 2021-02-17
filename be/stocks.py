import stocker
import pandas as pd
import yfinance as yf


def get_all_matched_symbols(search_text):
    data = pd.read_csv('./data/nasdaq_screener_1612437412043.csv')
    all_symbols = list(data['Symbol'])

    indices = [i for i, symbol in enumerate(all_symbols) if search_text in symbol]

    result = data.iloc[indices, :]

    return result

def get_stocks_infos(company_name):

    company_infos = yf.Ticker(company_name)

    # get historical market data
    history = company_infos.history(period = '30d')
    
    currency = company_infos.info['currency']
    full_name = company_infos.info['longName']
    business_summary = company_infos.info['longBusinessSummary']

    return history, currency, full_name, business_summary

def predict_next_day(symbol):
    
    result = stocker.predict.tomorrow(symbol)

    return result[0], result[2]