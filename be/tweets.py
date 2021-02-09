import tweepy


def get_tweets_text(search_word):

    print('Search word:', search_word)

    # credentials
    consumer_key = ''
    consumer_secret = ''
    access_token = '-'
    access_token_secret = ''

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, wait_on_rate_limit = True)

    # get the tweets
    tweets = tweepy.Cursor(api.search, q = search_word, lang = 'en').items(20)

    list_of_tweets = [tweet.text for tweet in tweets]

    return list_of_tweets