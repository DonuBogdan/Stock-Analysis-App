import yfinance as yf


apple = yf.Ticker('AAPL')

# get historical market data
history = apple.history(period = '5d')

print(history)