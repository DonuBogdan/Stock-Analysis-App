import tweepy


def get_tweets_text(search_word):

    print('Search word:', search_word)

    # credentials
    consumer_key = 'R1LZFgXrFclzdSh0GupX2pxnT'
    consumer_secret = 'bBgSvyYmnN0PmG5Crq9nnhCr0pKhCImyfm0XFkUnRmbK4IRH3x'
    access_token = '1336286674222002177-305av71Wo8u53WMxF6wUPEQrQdDa8j'
    access_token_secret = 'rgMirfblF1SFXnP5dfBxwcmrQwdQQjdJX7o8zkhj8RLY2'

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, wait_on_rate_limit = True)

    # get the tweets
    tweets = tweepy.Cursor(api.search, q = search_word, lang = 'en').items(20)

    list_of_tweets = [tweet.text for tweet in tweets]

    return list_of_tweets