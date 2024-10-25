import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../components/SudokuStyle.css";
import SudokuGrid from "../components/SudokuGrid";
import ButtonContainer from "../components/ButtonContainer";
import NumPad from "../components/NumPad"; // Import the NumPad component
import Layout from "../components/Layout"; // Import the Layout component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSudoku } from "sudoku-gen"; // Import the sudoku-gen library

const Sudoku = () => {
  const [puzzleGrid, setPuzzleGrid] = useState([]);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [originalPuzzleGrid, setOriginalPuzzleGrid] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [selectedNumber, setSelectedNumber] = useState(null);
  const navigate = useNavigate();
  const devTool = process.env.REACT_APP_SHOW_DEV_TOOLS;
  const maxMistakes = 5;
  console.log("Dev Tool:", devTool);
  useEffect(() => {
    // Generate an easy Sudoku puzzle
    const sudoku = getSudoku("easy");
    const puzzle = sudoku.puzzle.split(""); // Convert string to array of characters
    const solution = sudoku.solution.split(""); // Convert string to array of characters
    console.log("Puzzle:", puzzle);
    console.log("Solution:", solution);

    const transformTo2DArray = (array) => {
      let grid = [];
      for (let i = 0; i < 9; i++) {
        grid.push(
          array
            .slice(i * 9, (i + 1) * 9)
            .map((cell) => (cell === "-" ? "" : parseInt(cell)))
        );
      }
      return grid;
    };

    const transformedPuzzle = transformTo2DArray(puzzle);
    const transformedSolution = transformTo2DArray(solution);

    setPuzzleGrid(transformedPuzzle);
    setSolutionGrid(transformedSolution);
    setOriginalPuzzleGrid(JSON.parse(JSON.stringify(transformedPuzzle)));
  }, []);

  const resetPuzzle = useCallback(() => {
    setPuzzleGrid(JSON.parse(JSON.stringify(originalPuzzleGrid)));
    setMistakes(0);
  }, [originalPuzzleGrid]);

  useEffect(() => {
    if (mistakes >= maxMistakes) {
      toast.error("Too many mistakes! The board will be reset.");
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

    if (intValue === solutionGrid[row][col]) {
      newPuzzleGrid[row][col] = intValue;
      toast.success("Correct value entered!");
    } else {
      toast.error("Incorrect value entered!");
      newPuzzleGrid[row][col] = "";
      setMistakes((prevMistakes) => prevMistakes + 1);
    }

    setPuzzleGrid(newPuzzleGrid);
    checkSolution(newPuzzleGrid);
  };

  const handleNumberClick = (number) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      handleCellChange(selectedCell.row, selectedCell.col, number);
    }
  };

  const checkSolution = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== solutionGrid[row][col]) {
          return;
        }
      }
    }
    toast.success("Congratulations! The puzzle is solved correctly.");
  };

  const handleSubmit = () => {
    checkSolution(puzzleGrid);
    if (
      puzzleGrid.every((row, rowIndex) =>
        row.every((cell, colIndex) => cell === solutionGrid[rowIndex][colIndex])
      )
    ) {
      navigate("/victory");
    } else {
      toast.error("The puzzle is not solved correctly.");
    }
  };

  return (
    <Layout>
      <div className="center-container">
        <div className="sudoku-container">
          <SudokuGrid
            puzzle={puzzleGrid}
            onCellChange={handleCellChange}
            onCellSelect={(row, col, value) => {
              setSelectedCell({ row, col });
              setSelectedNumber(value !== "" ? value : null);
            }}
            selectedCell={selectedCell}
            selectedNumber={selectedNumber}
          />
          <NumPad onNumberClick={handleNumberClick} />{" "}
          <ButtonContainer
            onReset={resetPuzzle}
            onCheckSolution={() => checkSolution(puzzleGrid)}
            onSubmit={handleSubmit}
          />
        </div>
        <p>
          Mistakes: {mistakes}/{maxMistakes}
        </p>
      </div>
      {process.env.REACT_APP_SHOW_DEV_TOOLS === "true" && ( // Not compatible on smaller devices
        <div>
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate("/victory")}
          >
            Go to Victory Page (Dev Tool)
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={() => {
              setPuzzleGrid(solutionGrid);
              checkSolution(solutionGrid);
            }}
          >
            Auto-Complete Grid (Dev Tool)
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Sudoku;
