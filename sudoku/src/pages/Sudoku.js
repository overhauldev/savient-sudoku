import React, { useState, useEffect } from "react";
import "../App.css";
import "../components/SudokuStyle.css";
import SudokuGrid from "../components/SudokuGrid";
import ButtonContainer from "../components/ButtonContainer";
import sudoku from "sudoku";

const puzzle = sudoku.makepuzzle("easy");
const solution = sudoku.solvepuzzle(puzzle);
const TestSudokuGrid = () => {
  const [puzzleGrid, setPuzzleGrid] = useState([]);
  const [solutionGrid, setSolutionGrid] = useState([]);

  useEffect(() => {
    // Generate the puzzle and transform it into a 2D array

    const transformTo2DArray = (puzzle) => {
      let grid = [];
      for (let i = 0; i < 9; i++) {
        grid.push(
          puzzle
            .slice(i * 9, (i + 1) * 9)
            .map((cell) => (cell === null ? "" : cell + 1))
        );
      }
      return grid;
    };
    console.log(transformTo2DArray(puzzle));
    console.log(transformTo2DArray(solution));
    setPuzzleGrid(transformTo2DArray(puzzle));
    setSolutionGrid(solution);
  }, []);

  const handleCellChange = (row, col, value) => {
    const newPuzzleGrid = [...puzzleGrid];
    const intValue = parseInt(value) || 0;
    if (intValue === solutionGrid[row * 9 + col]) {
      newPuzzleGrid[row][col] = intValue;
      console.log("Correct");
    } else {
      alert("Incorrect value entered!");
      newPuzzleGrid[row][col] = ""; // Remove the incorrect value
      console.log("Incorrect");
    }
    setPuzzleGrid(newPuzzleGrid);
  };

  return (
    <div className="App-header">
      <h1>Test Sudoku Grid</h1>
      <div className="center-container">
        <div className="sudoku-container">
          <SudokuGrid puzzle={puzzleGrid} onCellChange={handleCellChange} />
        </div>
      </div>
      <ButtonContainer />
    </div>
  );
};

export default TestSudokuGrid;
