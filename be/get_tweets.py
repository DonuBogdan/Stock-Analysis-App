import tweepy


# credentials
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit = True)

search_word = 'apple'

# get the tweets
tweets = tweepy.Cursor(api.search, q = search_word, lang = 'en').items()

for tweet in tweets:
    print(tweet)