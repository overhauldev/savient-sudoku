import React from "react";
import "../App.css";
import "../components/SudokuStyle.css";
import SudokuGrid from "../components/SudokuGrid";
import ButtonContainer from "../components/ButtonContainer";

const TestSudokuGrid = () => {
  const testPuzzle = Array(9).fill(Array(9).fill(""));

  const handleCellClick = (row, col) => {
    console.log(`Cell clicked: Row ${row}, Column ${col}`);
  };

  return (
    <div className="App-header">
      <h1>Test Sudoku Grid</h1>
      <SudokuGrid puzzle={testPuzzle} onCellClick={handleCellClick} />
      <ButtonContainer />
    </div>
  );
};

export default TestSudokuGrid;
