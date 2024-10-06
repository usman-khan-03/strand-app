from flask import Flask, request, jsonify, session
from flask_cors import CORS
from functools import wraps
from signup import signup, create_tables
from login import login
from professor import update_professor_data

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

@app.route('/api/create_word_search', methods=['POST'])
def create_word_search_route():
    data = request.json
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    result = create_word_search(data)
    return jsonify(result), 200 if result["success"] else 400


@app.route('/api/professor_data', methods=['POST'])
def receive_professor_data():
    data = request.json
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400

    # Extract data from the request
    topic = data.get('topic')
    date = data.get('date')
    code = data.get('code')
    words = data.get('words')

    # Use the fixed email address
    email = 'project@gmail.com'

    # Validate the received data
    if not (topic and date and code and words and len(words) == 6):
        return jsonify({"success": False, "message": "Incomplete data provided"}), 400

    # Call the function to update the professor's data
    success = update_professor_data(email, words, topic, date, code)
    if success:
        return jsonify({"success": True, "message": "Data updated successfully"}), 200
    else:
        return jsonify({"success": False, "message": "Failed to update data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
