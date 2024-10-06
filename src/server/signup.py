def signup(user_data):
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

        # Check if email already exists
        cursor.execute("SELECT * FROM student WHERE email_address = ?", (email,))
        if cursor.fetchone():
            return {"success": False, "message": "Email already exists"}

        cursor.execute("SELECT * FROM professor WHERE email_address = ?", (email,))
        if cursor.fetchone():
            return {"success": False, "message": "Email already exists"}

        if role.lower() == 'student':
            query = "INSERT INTO student (email_address, name, password) VALUES (?, ?, ?)"
        elif role.lower() == 'professor':
            query = "INSERT INTO professor (email_address, name, password) VALUES (?, ?, ?)"
        else:
            return {"success": False, "message": "Invalid role"}

        cursor.execute(query, (email, name, password))
        connection.commit()

        return {"success": True, "message": "User registered successfully"}

    except sqlite3.Error as e:
        print(f"Error: {e}")
        return {"success": False, "message": "An error occurred during registration"}

    finally:
        if connection:
            cursor.close()
            connection.close()