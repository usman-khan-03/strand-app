import sqlite3
import json
import sys
import os

def create_connection():
    try:
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'new_database.db')
        connection = sqlite3.connect(db_path)
        connection.execute("PRAGMA foreign_keys = 1")
        print(f"Connected to database at {db_path}")
        return connection
    except sqlite3.Error as e:
        print(f"Error connecting to SQLite database: {e}")
        return None

def login(email, password):
    connection = None
    try:
        connection = create_connection()
        if not connection:
            return {"success": False, "message": "Database connection failed"}

        cursor = connection.cursor()

        # Check student table
        cursor.execute("SELECT * FROM student WHERE email_address = ? AND password = ?", (email, password))
        user = cursor.fetchone()
        if user:
            return {
                "success": True, 
                "message": "Login successful", 
                "role": "student", 
                "user": {
                    "id": user[0],
                    "email": user[1],
                    "name": user[2],
                    "attendance": user[4],
                    "date": user[6]
                }
            }

        # Check professor table
        cursor.execute("SELECT * FROM professor WHERE email_address = ? AND password = ?", (email, password))
        user = cursor.fetchone()
        if user:
            return {
                "success": True, 
                "message": "Login successful", 
                "role": "professor", 
                "user": {
                    "id": user[0],
                    "email": user[1],
                    "name": user[2],
                    "title": user[10],
                    "date": user[11],
                    "code": user[12]
                }
            }

        return {"success": False, "message": "Invalid email or password"}

    except sqlite3.Error as e:
        print(f"Error: {e}")
        return {"success": False, "message": "An error occurred during login"}
    finally:
        if connection:
            connection.close()

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python login.py <email> <password>")
        sys.exit(1)

    email = sys.argv[1]
    password = sys.argv[2]

    result = login(email, password)
    print(json.dumps(result, indent=2))