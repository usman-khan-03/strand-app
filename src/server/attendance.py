# once word search is completed, the attendance for each student is marked complete

import mysql.connector
from mysql.connector import Error
from datetime import datetime

def update_attendance(email, attendance, date):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='your_database_name',
            user='your_username',
            password='your_password'
        )

        cursor = connection.cursor()

        query = "UPDATE student SET attendance = %s, date = %s WHERE email_address = %s"
        cursor.execute(query, (attendance, date, email))
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
# date_str = "05/20/2023"  # mm/dd/yyyy
# date_obj = datetime.strptime(date_str, "%m/%d/%Y").date()
# success = update_attendance("student@email.com", 1, date_obj)
# if success:
#     print("Attendance updated successfully")
# else:
#     print("Failed to update attendance")