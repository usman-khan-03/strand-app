# sign up page for both professor and students

import mysql.connector
from mysql.connector import Error

def signup(email, name, password, role):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='your_database_name',
            user='your_username',
            password='your_password'
        )

        cursor = connection.cursor()

        if role.lower() == 'student':
            query = "INSERT INTO student (email_address, name, password) VALUES (%s, %s, %s)"
        elif role.lower() == 'professor':
            query = "INSERT INTO professor (email_address, name, password) VALUES (%s, %s, %s)"
        else:
            return False

        cursor.execute(query, (email, name, password))
        connection.commit()

        return True

    except Error as e:
        print(f"Error: {e}")
        return False

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Usage example
# success = signup("example@email.com", "John Doe", "password123", "student")
# if success:
#     print("Signup successful")
# else:
#     print("Signup failed")