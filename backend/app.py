from flask import Flask, jsonify

app = Flask(__name__)
print("Hello World!")
@app.route('/')
def home():
    return jsonify(message="Welcome to the Sudoku App!")

if __name__ == '__main__':
    app.run(debug=True)