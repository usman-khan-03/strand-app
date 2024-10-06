# makes the grid for the word search using words pulled from db + uses llm api to make definitions

import random
import json
from typing import List, Tuple

def generate_word_search(words: List[str], max_attempts: int = 1000) -> List[List[str]]:
    grid_size = len(max(words, key=len))
    
    def create_empty_grid():
        return [[' ' for _ in range(grid_size)] for _ in range(grid_size)]

    def is_valid_position(grid, x: int, y: int) -> bool:
        return 0 <= x < grid_size and 0 <= y < grid_size and grid[y][x] == ' '

    def get_directions():
        return [
            [(1, 0)], [(0, 1)],  # Horizontal and vertical
            [(1, 1)], [(1, -1)],  # Diagonal
            [(1, 0), (0, 1)], [(1, 0), (0, -1)],  # L-shape (right angle)
            [(-1, 0), (0, 1)], [(-1, 0), (0, -1)]
        ]

    def place_word(grid, word: str, start_pos: Tuple[int, int], direction: List[Tuple[int, int]]) -> bool:
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

# Generate puzzle and save to JSON
words = ["HAPPYBIRTHDAY", "CELEBRATE", "CARDS", "PARTY", "CAKE", "CANDLES", "GIFTS"]
puzzle = generate_word_search(words)

puzzle_data = {
    "puzzle": puzzle,
    "words": words
}

with open('word_search_puzzle.json', 'w') as f:
    json.dump(puzzle_data, f)

print("Puzzle generated and saved to word_search_puzzle.json")