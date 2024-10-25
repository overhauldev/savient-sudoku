import React from "react";
import "./NumPad.css";

const NumPad = ({ onNumberClick }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="numpad-container">
      {numbers.map((number) => (
        <button
          key={number}
          className="numpad-button"
          onClick={() => onNumberClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default NumPad;
