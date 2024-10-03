from flask import Flask, jsonify, request
from puzzle import generate_puzzle, validate_puzzle

app = Flask(__name__)

@app.route('/api/puzzle/<int:size>', methods=['GET'])
def get_puzzle(size):
    puzzle = generate_puzzle(size)
    return jsonify({"puzzle": puzzle})

@app.route('/api/validate', methods=['POST'])
def validate():
    data = request.json
    puzzle = data['puzzle']
    is_valid = validate_puzzle(puzzle)
    if is_valid:
        return jsonify({"message": "Puzzle is correct!"})
    else:
        return jsonify({"message": "Incorrect solution, try again."})

if __name__ == '__main__':
    app.run(debug=True)