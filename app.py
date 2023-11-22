from flask import Flask, render_template


app = Flask(__name__, static_url_path="/soft_static")


@app.route('/', methods=['GET'])
def home_page():
    return render_template('home.html')