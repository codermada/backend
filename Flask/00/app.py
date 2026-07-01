#! ../env/bin/python3

from flask import Flask, render_template
import requests
import json

def get_meme():
    url = "https://meme-api.com/gimme"
    response = requests.get(url).json()

    meme_large = response.get("preview", [response["url"]])[-1]
    subreddit = response["subreddit"]

    return meme_large, subreddit

app = Flask(__name__)

@app.route('/')
def index():
    meme_pic, subreddit = get_meme()
    return render_template("index.html", meme_pic=meme_pic, subreddit=subreddit)

if __name__ == '__main__':
    app.run(debug=True)