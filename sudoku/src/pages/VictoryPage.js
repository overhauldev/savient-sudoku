import React from "react";
import { Link } from "react-router-dom";
import "./VictoryPage.css";

function VictoryPage() {
  return (
    <div className="victory-page">
      <h1>Congratulations!</h1>
      <p>You have successfully solved the Sudoku puzzle!</p>
      <p>(enter badge png here or secret code)</p>
      <Link to="/">
        <button className="btn btn-outline-primary btn-lg">Go Home</button>
      </Link>
    </div>
  );
}

export default VictoryPage;
