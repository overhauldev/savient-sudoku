import React from "react";
import "../App.css";
import "../components/SudokuStyle.css";
import SudokuGrid from "../components/SudokuGrid";
import ButtonContainer from "../components/ButtonContainer";

const TestSudokuGrid = () => {
  const [selectedCell, setSelectedCell] = React.useState(null);
  const testPuzzle = [
    ["", "", "", "", "", "", "", "", "8"],
    ["", "", "", "", "", "2", "3", "", ""],
    ["", "", "", "", "", "", "", "", "1"],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "1", ""],
    ["", "", "", "", "", "", "", "4", ""],
    ["", "", "", "", "", "", "", "8", ""],
    ["", "", "", "", "", "", "", "9", "3"],
    ["", "", "", "", "", "", "", "", ""],
  ];
  console.log(testPuzzle);
  const handleCellClick = (row, col) => {
    selectedCell = { row, col };
    console.log(selectedCell);
    setSelectedCell(selectedCell);
  };

  return (
    <div className="App-header">
      <h1>Test Sudoku Grid</h1>
      <div className="center-container">
        <div className="sudoku-container">
          <SudokuGrid puzzle={testPuzzle} onCellClick={handleCellClick} />
        </div>
      </div>
      <ButtonContainer />
    </div>
  );
};
export default TestSudokuGrid;
