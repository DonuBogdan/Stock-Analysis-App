import yfinance as yf


def get_stocks_infos(company_name):

    company_infos = yf.Ticker(company_name)

    # get historical market data
    history = company_infos.history(period = '30d')
    
    currency = company_infos.info['currency']
    full_name = company_infos.info['longName']

    return history, currency, full_name