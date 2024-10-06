import sqlite3
import os

def create_connection():
    try:
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database_search.db')
        connection = sqlite3.connect(db_path)
        connection.execute("PRAGMA foreign_keys = 1")
        print(f"Connected to database at {db_path}")
        return connection
    except sqlite3.Error as e:
        print(f"Error connecting to SQLite database: {e}")
        return None

def create_word_search(data):
    connection = None
    try:
        connection = create_connection()
        if not connection:
            return {"success": False, "message": "Database connection failed"}

        cursor = connection.cursor()

        # Insert the word search data into the database
        cursor.execute("""
            INSERT INTO word_searches (topic, date, code, word1, word2, word3, word4, word5, word6)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data['topic'],
            data['date'],
            data['code'],
            data['words'][0],
            data['words'][1],
            data['words'][2],
            data['words'][3],
            data['words'][4],
            data['words'][5]
        ))

        connection.commit()

        return {"success": True, "message": "Word search created successfully"}

    except sqlite3.Error as e:
        print(f"Error: {e}")
        return {"success": False, "message": "An error occurred while creating the word search"}
    finally:
        if connection:
            connection.close()

# You may want to add more functions here for other professor-related operations