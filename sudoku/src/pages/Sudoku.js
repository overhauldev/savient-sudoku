import React, { useState, useEffect } from "react";
import "../components/SudokuStyle.css";
import SudokuGrid from "../components/SudokuGrid";
import ButtonContainer from "../components/ButtonContainer";
import sudoku from "sudoku";

const TestSudokuGrid = () => {
  const [puzzleGrid, setPuzzleGrid] = useState([]);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [originalPuzzleGrid, setOriginalPuzzleGrid] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 5; // Set the maximum number of allowed mistakes

  useEffect(() => {
    // Generate the puzzle and transform it into a 2D array
    const puzzle = sudoku.makepuzzle("easy");
    const solution = sudoku.solvepuzzle(puzzle);

    const transformTo2DArray = (array) => {
      let grid = [];
      for (let i = 0; i < 9; i++) {
        grid.push(
          array
            .slice(i * 9, (i + 1) * 9)
            .map((cell) => (cell === null ? "" : cell + 1))
        );
      }
      return grid;
    };

    const transformedPuzzle = transformTo2DArray(puzzle);
    const transformedSolution = transformTo2DArray(solution);

    console.log("Generated Puzzle:", transformedPuzzle);
    console.log("Solution:", transformedSolution);

    setPuzzleGrid(transformedPuzzle);
    setSolutionGrid(transformedSolution);
    setOriginalPuzzleGrid(JSON.parse(JSON.stringify(transformedPuzzle))); // Store a deep copy of the original puzzle state
  }, []);

  const handleCellChange = (row, col, value) => {
    if (!solutionGrid.length) {
      console.log("Solution grid is not yet initialized.");
      return;
    }

    const newPuzzleGrid = [...puzzleGrid];
    const intValue = parseInt(value) || 0;

    console.log(
      `Entered value: ${intValue}, Expected value: ${solutionGrid[row][col]}`
    );

    if (intValue === solutionGrid[row][col]) {
      newPuzzleGrid[row][col] = intValue;
      console.log("Correct");
    } else {
      alert("Incorrect value entered!");
      newPuzzleGrid[row][col] = ""; // Remove the incorrect value
      console.log("Incorrect");
    }
    setPuzzleGrid(newPuzzleGrid);
  };

  const resetPuzzle = () => {
    setPuzzleGrid(JSON.parse(JSON.stringify(originalPuzzleGrid))); // Reset to the original puzzle state
  };

  if (!solutionGrid.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App-header">
      <h1>Savient Sudoku</h1>
      <div className="center-container">
        <div className="sudoku-container">
          <SudokuGrid puzzle={puzzleGrid} onCellChange={handleCellChange} />
        </div>
      </div>
      <ButtonContainer onReset={resetPuzzle} />
    </div>
  );
};

export default TestSudokuGrid;
