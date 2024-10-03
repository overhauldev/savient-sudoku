import React from 'react';
import './SudokuGrid.css';

const SudokuGrid = ({ gridSize, puzzle, setPuzzle }) => {
  const handleChange = (e, row, col) => {
    const value = parseInt(e.target.value) || '';
    const newPuzzle = [...puzzle];
    newPuzzle[row][col] = value;
    setPuzzle(newPuzzle);
  };

  return (
    <div className="sudoku-grid">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="number"
              className="sudoku-cell"
              value={cell || ''}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              min="1"
              max={gridSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;