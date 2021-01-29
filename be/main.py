# import yfinance as yf


# apple = yf.Ticker('AAPL')

# # get historical market data
# history = apple.history(period = '5d')

# print(history)

import flask 

from flask import jsonify
from flask_cors import CORS


app = flask.Flask(__name__)
app.config['DEBUG'] = True
CORS(app, support_credentials = True)

books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]

@app.route('/', methods = ['GET'])
def home():
    return 'Home.'

@app.route('/api/v1/resources/books/all', methods = ['GET'])
def get_all_books():
    return jsonify(books)

app.run()