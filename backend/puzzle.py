import random

def generate_puzzle(size):
    # Create a simple grid of size x size with random numbers
    puzzle = [[random.randint(1, size) for _ in range(size)] for _ in range(size)]
    return puzzle

def validate_puzzle(puzzle):
    # Basic check: ensure each number is in the valid range (you can add more complex logic)
    size = len(puzzle)
    for row in puzzle:
        if len(set(row)) != size:  # All numbers should be unique in the row
            return False
    return True