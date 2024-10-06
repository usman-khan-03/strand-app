# extracts today's strands words given by professor thru frontend, sends them to db

import mysql.connector
from mysql.connector import Error
from datetime import datetime

def update_professor_data(email, words, title, date, code):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='your_database_name',
            user='your_username',
            password='your_password'
        )

        cursor = connection.cursor()

        query = """
        UPDATE professor 
        SET word1 = %s, word2 = %s, word3 = %s, word4 = %s, word5 = %s, word6 = %s, 
            title = %s, date = %s, code = %s 
        WHERE email_address = %s
        """
        
        cursor.execute(query, (*words, title, date, code, email))
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
# words = ["HAPPYBIRTHDAY", "CELEBRATE", "CARDS", "PARTY", "CAKE", "CANDLES"]
# date_str = "05/20/2023"  # mm/dd/yyyy
# date_obj = datetime.strptime(date_str, "%m/%d/%Y").date()
# success = update_professor_data("professor@email.com", words, "Birthday Puzzle", date_obj, "BDAY001")
# if success:
#     print("Professor data updated successfully")
# else:
#     print("Failed to update professor data")