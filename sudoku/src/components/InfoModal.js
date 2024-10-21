import React from "react";
import "./InfoModal.css";

const InfoModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>How Sudoku Works</h2>
        <p>
          Sudoku is a logic-based number placement puzzle. The objective is to
          fill a 9x9 grid with digits so that each column, each row, and each of
          the nine 3x3 subgrids that compose the grid contain all of the digits
          from 1 to 9.
        </p>
        <h3>Rules:</h3>
        <ul>
          <li>Each row must contain the digits 1 to 9 without repetition.</li>
          <li>
            Each column must contain the digits 1 to 9 without repetition.
          </li>
          <li>
            Each 3x3 subgrid must contain the digits 1 to 9 without repetition.
          </li>
        </ul>
        <p>Good luck Agents!</p>
        <button className="btn btn-outline-primary btn-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
