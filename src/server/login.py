# retrieves login info from db for both student and professor

import mysql.connector
from mysql.connector import Error

def login(email, password):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='your_database_name',
            user='your_username',
            password='your_password'
        )

        cursor = connection.cursor()

        # Check student table
        query = "SELECT * FROM student WHERE email_address = %s AND password = %s"
        cursor.execute(query, (email, password))
        student = cursor.fetchone()

        if student:
            return {"role": "student", "data": student}

        # Check professor table
        query = "SELECT * FROM professor WHERE email_address = %s AND password = %s"
        cursor.execute(query, (email, password))
        professor = cursor.fetchone()

        if professor:
            return {"role": "professor", "data": professor}

        return None

    except Error as e:
        print(f"Error: {e}")
        return None

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Usage example
# result = login("example@email.com", "password123")
# if result:
#     print(f"Login successful. Role: {result['role']}")
# else:
#     print("Login failed")