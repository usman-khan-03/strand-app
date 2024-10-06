import random
import sqlite3
import os
import logging

logging.basicConfig(level=logging.DEBUG)

def create_connection():
    try:
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database_search.db')
        connection = sqlite3.connect(db_path)
        logging.info(f"Connected to database at {db_path}")
        return connection
    except sqlite3.Error as e:
        logging.error(f"Error connecting to SQLite database: {e}")
        return None

def get_words_from_db(code):
    connection = create_connection()
    if not connection:
        return None
    
    try:
        cursor = connection.cursor()
        query = "SELECT word1, word2, word3, word4, word5, word6 FROM professor WHERE code = ?"
        logging.debug(f"Executing query: {query} with code: {code}")
        cursor.execute(query, (code,))
        result = cursor.fetchone()
        if result:
            words = [word for word in result if word]
            logging.info(f"Found words for code {code}: {words}")
            return words
        else:
            logging.warning(f"No words found for code: {code}")
            return None
    except sqlite3.Error as e:
        logging.error(f"Database error: {e}")
        return None
    finally:
        connection.close()

def generate_word_search(words, max_attempts=1000):
    grid_size = max(len(max(words, key=len)), len(words))
    
    def create_empty_grid():
        return [[' ' for _ in range(grid_size)] for _ in range(grid_size)]

    def is_valid_position(grid, x, y):
        return 0 <= x < grid_size and 0 <= y < grid_size and grid[y][x] == ' '

    def get_directions():
        return [
            [(1, 0)], [(0, 1)],  # Horizontal and vertical
            [(1, 1)], [(1, -1)],  # Diagonal
            [(1, 0), (0, 1)], [(1, 0), (0, -1)],  # L-shape (right angle)
            [(-1, 0), (0, 1)], [(-1, 0), (0, -1)]
        ]

    def place_word(grid, word, start_pos, direction):
        x, y = start_pos
        temp_grid = [row[:] for row in grid]
        for i, letter in enumerate(word):
            if i == 0 or (i == 1 and len(direction) > 1):
                dx, dy = direction[min(i, len(direction) - 1)]
            if not is_valid_position(temp_grid, x, y):
                return False
            temp_grid[y][x] = letter
            x, y = x + dx, y + dy
        for i in range(grid_size):
            for j in range(grid_size):
                if temp_grid[i][j] != ' ':
                    grid[i][j] = temp_grid[i][j]
        return True

    def try_place_words(grid, words_to_place):
        positions = [(x, y) for y in range(grid_size) for x in range(grid_size)]
        directions = get_directions()
        for word in words_to_place:
            placed = False
            random.shuffle(positions)
            random.shuffle(directions)
            for pos in positions:
                for direction in directions:
                    if place_word(grid, word, pos, direction):
                        placed = True
                        break
                if placed:
                    break
            if not placed:
                return False
        return True

    for _ in range(max_attempts):
        grid = create_empty_grid()
        if try_place_words(grid, sorted(words, key=len, reverse=True)):
            for y in range(grid_size):
                for x in range(grid_size):
                    if grid[y][x] == ' ':
                        grid[y][x] = random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
            return grid

    raise ValueError("Unable to generate a valid word search puzzle after multiple attempts")

def generate_puzzle(code):
    logging.info(f"Generating puzzle for code: {code}")
    words = get_words_from_db(code)
    if not words:
        logging.warning(f"No words found for code: {code}")
        return {"success": False, "message": f"No words found for the given code: {code}"}
    
    try:
        puzzle = generate_word_search(words)
        puzzle_data = {
            "success": True,
            "puzzle": puzzle,
            "words": words
        }
        logging.info(f"Successfully generated puzzle for code {code}")
        return puzzle_data
    except ValueError as e:
        logging.error(f"Error generating puzzle: {e}")
        return {"success": False, "message": str(e)}

if __name__ == '__main__':
    import sys
    if len(sys.argv) != 2:
        print("Usage: python grid.py <code>")
        sys.exit(1)
    
    code = sys.argv[1]
    result = generate_puzzle(code)
    print(result)