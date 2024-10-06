import sqlite3
import json
import sys
import os

def create_connection():
    try:
        # Adjust the database name if necessary
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database_search.db')
        connection = sqlite3.connect(db_path)
        connection.execute("PRAGMA foreign_keys = 1")
        print(f"Connected to database at {db_path}")
        return connection
    except sqlite3.Error as e:
        print(f"Error connecting to SQLite database: {e}")
        return None

def create_tables():
    connection = create_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS student (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email_address TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            attendance INTEGER DEFAULT 0,
            role TEXT DEFAULT 'student',
            date TEXT
        )
        ''')
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS professor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email_address TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            word1 TEXT,
            word2 TEXT,
            word3 TEXT,
            word4 TEXT,
            word5 TEXT,
            word6 TEXT,
            title TEXT,
            date TEXT,
            code TEXT
        )
        ''')
        connection.commit()
        connection.close()
        print("Tables created successfully")

def signup(user_data):
    connection = None
    try:
        role = user_data.get('role')
        name = user_data.get('name')
        email = user_data.get('email')
        password = user_data.get('password')

        if not all([role, name, email, password]):
            return {"success": False, "message": "Missing required fields"}

        connection = create_connection()
        if not connection:
            return {"success": False, "message": "Database connection failed"}

        cursor = connection.cursor()

        if role.lower() == 'student':
            query = "INSERT INTO student (email_address, name, password) VALUES (?, ?, ?)"
        elif role.lower() == 'professor':
            query = "INSERT INTO professor (email_address, name, password) VALUES (?, ?, ?)"
        else:
            return {"success": False, "message": "Invalid role"}

        cursor.execute(query, (email, name, password))
        connection.commit()
        print(f"Inserted {cursor.rowcount} row(s)")

        return {"success": True, "message": "User registered successfully"}

    except sqlite3.IntegrityError as e:
        print(f"IntegrityError: {e}")
        return {"success": False, "message": "Email already exists"}
    except sqlite3.Error as e:
        print(f"Error: {e}")
        return {"success": False, "message": "An error occurred during registration"}
    finally:
        if connection:
            connection.close()

def verify_data():
    connection = create_connection()
    if connection:
        cursor = connection.cursor()
        print("\nVerifying data:")
        cursor.execute("SELECT * FROM student")
        students = cursor.fetchall()
        print("Students:", students)
        cursor.execute("SELECT * FROM professor")
        professors = cursor.fetchall()
        print("Professors:", professors)
        connection.close()

if __name__ == '__main__':
    create_tables()

    if len(sys.argv) != 2:
        print("Usage: python signup.py <path_to_json_file>")
        sys.exit(1)

    json_file_path = sys.argv[1]

    try:
        with open(json_file_path, 'r') as file:
            user_data = json.load(file)
    except FileNotFoundError:
        print(f"Error: File {json_file_path} not found.")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file {json_file_path}.")
        sys.exit(1)

    result = signup(user_data)
    print(json.dumps(result, indent=2))

    verify_data()