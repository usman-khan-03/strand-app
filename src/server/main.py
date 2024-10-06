# starts running the app on a local server

from flask import Flask, request, jsonify
from flask_cors import CORS
from login import login
from signup import signup
from grid import generate_puzzle
import logging

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

logging.basicConfig(level=logging.DEBUG)

@app.route('/api/signup', methods=['POST'])
def signup_user():
    data = request.json 
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    result = signup(data)
    return jsonify(result), 200 if result["success"] else 400

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.json
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    result = login(data["email"], data["password"])
    return jsonify(result), 200 if result["success"] else 401


@app.route('/api/generate-puzzle', methods=['POST', 'OPTIONS'])
def generate_word_search():
    if request.method == 'OPTIONS':
        return '', 200
    logging.debug(f"Received request: {request.json}")
    data = request.json
    if not data or 'code' not in data:
        logging.error("No code provided in the request")
        return jsonify({"success": False, "message": "No code provided"}), 400
    
    code = data['code']
    logging.debug(f"Generating puzzle for code: {code}")
    result = generate_puzzle(code)
    logging.debug(f"Puzzle generation result: {result}")
    
    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 400


if __name__ == '__main__':
    app.run(debug=True)
