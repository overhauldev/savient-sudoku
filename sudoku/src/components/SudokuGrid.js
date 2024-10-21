import React from "react";
import Cell from "./Cell";

const SudokuGrid = ({ puzzle, onCellChange }) => {
  return (
    <div className="sudoku-grid">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
