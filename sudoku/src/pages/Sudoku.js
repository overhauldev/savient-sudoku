import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported correctly
import "../components/SudokuStyle.css";
import SudokuGrid from "../components/SudokuGrid";
import ButtonContainer from "../components/ButtonContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sudoku from "sudoku";

const TestSudokuGrid = () => {
  const [puzzleGrid, setPuzzleGrid] = useState([]);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [originalPuzzleGrid, setOriginalPuzzleGrid] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const navigate = useNavigate();
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

  const resetPuzzle = useCallback(() => {
    setPuzzleGrid(JSON.parse(JSON.stringify(originalPuzzleGrid))); // Reset to the original puzzle state
    setMistakes(0); // Reset the mistakes counter
  }, [originalPuzzleGrid]);

  useEffect(() => {
    if (mistakes >= maxMistakes) {
      toast.error("Too many mistakes! The board will be reset."); // Display error notification
      resetPuzzle();
    }
  }, [mistakes, resetPuzzle]);

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
      toast.success("Correct value entered!"); // Display success notification
    } else {
      toast.error("Incorrect value entered!"); // Display error notification
      newPuzzleGrid[row][col] = ""; // Remove the incorrect value
      setMistakes((prevMistakes) => prevMistakes + 1);
      console.log("Incorrect");
    }

    setPuzzleGrid(newPuzzleGrid);
    checkSolution(newPuzzleGrid); // Check the solution after each cell change
  };

  const checkSolution = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== solutionGrid[row][col]) {
          return; // If any cell is incorrect, return early
        }
      }
    }
    toast.success("Congratulations! The puzzle is solved correctly."); // Display success notification
  };

  const handleSubmit = () => {
    checkSolution(puzzleGrid);
    if (
      puzzleGrid.every((row, rowIndex) =>
        row.every((cell, colIndex) => cell === solutionGrid[rowIndex][colIndex])
      )
    ) {
      navigate("/victory"); // Navigate to the victory page if all cells are correct
    } else {
      toast.error("The puzzle is not solved correctly."); // Display error notification
    }
  };

  // dev tool
  const navigateToVictory = () => {
    navigate("/victory");
  };

  // dev tool: auto-complete the grid with the solution
  const autoCompleteGrid = () => {
    setPuzzleGrid(solutionGrid);
    checkSolution(solutionGrid); // Check the solution after auto-completing
  };

  return (
    <div className="App-header">
      <h1>Savient Sudoku</h1>
      <div className="center-container">
        <div className="sudoku-container">
          <SudokuGrid puzzle={puzzleGrid} onCellChange={handleCellChange} />
        </div>
      </div>
      <ButtonContainer
        onReset={resetPuzzle}
        onCheckSolution={() => checkSolution(puzzleGrid)}
        onSubmit={handleSubmit}
      />
      <p>
        Mistakes: {mistakes}/{maxMistakes}
      </p>
      {process.env.NODE_ENV === "development" && (
        <div>
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={navigateToVictory}
          >
            Go to Victory Page (Dev Tool)
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={autoCompleteGrid}
          >
            Auto-Complete Grid (Dev Tool)
          </button>
        </div>
      )}
    </div>
  );
};

export default TestSudokuGrid;
