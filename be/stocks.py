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

    return history, currency, full_name