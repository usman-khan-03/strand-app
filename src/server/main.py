from flask import Flask, request, jsonify
from flask_cors import CORS
from signup import signup, create_tables
from login import login

app = Flask(__name__)

# Configure CORS with credentials support
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"], "supports_credentials": True}})

# Initialize tables
with app.app_context():
    create_tables()

@app.route('/api/signup', methods=['POST'])
def signup_user():
    data = request.json
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    result = signup(data)
    if result["success"]:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.json
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    result = login(data["email"], data["password"])
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 401

if __name__ == '__main__':
    app.run(debug=True)