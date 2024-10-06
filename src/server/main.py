# starts running the app on a local server

from flask import Flask, request, jsonify
from flask_cors import CORS
from signup import signup, create_tables
from login import login

app = Flask(__name__)

# Configure CORS with credentials support
cors_config = {
    "origins": ["http://localhost:3000"],  # Specify your frontend's URL
    "methods": ["POST"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True  # Enable credentials
}
CORS(app, resources={r"/api/*": cors_config})

# Initialize tables
with app.app_context():
    create_tables()

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

if __name__ == '__main__':
    app.run(debug=True)
