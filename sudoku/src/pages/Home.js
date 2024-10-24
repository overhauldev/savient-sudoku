import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="App-header">
      <h1>Savient Sudoku</h1>
      <p>Hello agents! Complete this puzzle to earn a secret badge!</p>
      <Link to="/Sudoku">
        <button type="button" className="btn btn-outline-primary btn-lg">
          Start
        </button>
      </Link>
    </div>
  );
}

export default Home;
