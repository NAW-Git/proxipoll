from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# API Test
@app.route("/test", methods=["GET"])
def test():
    return {"title": "Welcome to ProxiPoll!"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=7500, debug=True)