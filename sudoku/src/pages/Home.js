import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
function Home() {
  return (
    <div className="App-header">
      <h1>Savient Sudoku</h1>
      <p>Hello agents! Complete this puzzle to earn a secret badge!</p>
      <Link to="/Sudoku">
        <button type="button" class="btn btn-outline-primary btn-lg">
          Sudoku
        </button>
      </Link>{" "}
    </div>
  );
}

export default Home;
