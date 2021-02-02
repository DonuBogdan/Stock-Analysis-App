import yfinance as yf


def get_stocks_infos(company_name):

    # get historical market data
    df = yf.Ticker(company_name).history(period = '30d')

    return df