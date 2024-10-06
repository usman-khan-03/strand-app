# import sqlite3
# import os

# def create_connection():
#     try:
#         db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database_search.db')
#         connection = sqlite3.connect(db_path)
#         connection.execute("PRAGMA foreign_keys = 1")
#         print(f"Connected to database at {db_path}")
#         return connection
#     except sqlite3.Error as e:
#         print(f"Error connecting to SQLite database: {e}")
#         return None

# def create_word_search(data):
#     connection = None
#     try:
#         connection = create_connection()
#         if not connection:
#             return {"success": False, "message": "Database connection failed"}

#         cursor = connection.cursor()

#         # Insert the word search data into the database
#         cursor.execute("""
#             INSERT INTO word_searches (topic, date, code, word1, word2, word3, word4, word5, word6)
#             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
#         """, (
#             data['topic'],
#             data['date'],
#             data['code'],
#             data['words'][0],
#             data['words'][1],
#             data['words'][2],
#             data['words'][3],
#             data['words'][4],
#             data['words'][5]
#         ))

#         connection.commit()

#         return {"success": True, "message": "Word search created successfully"}

#     except sqlite3.Error as e:
#         print(f"Error: {e}")
#         return {"success": False, "message": "An error occurred while creating the word search"}
#     finally:
#         if connection:
#             connection.close()

# # You may want to add more functions here for other professor-related operations

# import sqlite3
# from datetime import datetime

# import sqlite3
# from datetime import datetime

# def update_professor_data(email, words, title, date_str, code):
#     try:
#         # Connect to your SQLite database file
#         connection = sqlite3.connect('database_search.db')
#         cursor = connection.cursor()

#         # Check if the email exists in the database
#         cursor.execute("SELECT 1 FROM professor WHERE email_address = ?", (email,))
#         exists = cursor.fetchone()

#         if not exists:
#             # Insert a new record with the email_address
#             cursor.execute("INSERT INTO professor (email_address) VALUES (?)", (email,))
#             connection.commit()
#             print(f"Inserted new professor with email: {email}")

#         # Now, update the other fields
#         query = """
#         UPDATE professor 
#         SET word1 = ?, word2 = ?, word3 = ?, word4 = ?, word5 = ?, word6 = ?, 
#             title = ?, date = ?, code = ? 
#         WHERE email_address = ?
#         """

#         cursor.execute(query, (*words, title, date_str, code, email))
#         connection.commit()

#         print(f"Updated professor data for email: {email}")
#         return True

#     except Exception as e:
#         print(f"Error in update_professor_data: {e}")
#         return False

#     finally:
#         if connection:
#             cursor.close()
#             connection.close()

import sqlite3

def update_professor_data(email, words, title, date_str, code):
    try:
        # Connect to your SQLite database file
        connection = sqlite3.connect('database_search.db')
        cursor = connection.cursor()

        # Check if the email exists in the database
        cursor.execute("SELECT 1 FROM professor WHERE email_address = ?", (email,))
        exists = cursor.fetchone()

        if not exists:
            # Insert a new record with the email_address
            cursor.execute("INSERT INTO professor (email_address) VALUES (?)", (email,))
            connection.commit()
            print(f"Inserted new professor with email: {email}")

        # Now, update the other fields
        query = """
        UPDATE professor 
        SET word1 = ?, word2 = ?, word3 = ?, word4 = ?, word5 = ?, word6 = ?, 
            title = ?, date = ?, code = ? 
        WHERE email_address = ?
        """

        cursor.execute(query, (*words, title, date_str, code, email))
        connection.commit()

        print(f"Updated professor data for email: {email}")
        return True

    except Exception as e:
        print(f"Error in update_professor_data: {e}")
        return False

    finally:
        if connection:
            cursor.close()
            connection.close()
