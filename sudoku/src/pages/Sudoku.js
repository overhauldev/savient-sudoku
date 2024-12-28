import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SudokuGrid from "../components/SudokuGrid";
import ButtonContainer from "../components/ButtonContainer";
import NumPad from "../components/NumPad";
import Layout from "../components/Layout";
import CompletionModal from "../components/CompletionModal";
import LoseModal from "../components/LoseModal";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSudoku } from "sudoku-gen";

const Sudoku = ({ devMode }) => {
  const [puzzleGrid, setPuzzleGrid] = useState([]);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [originalPuzzleGrid, setOriginalPuzzleGrid] = useState([]);
  const [adjustedPuzzleGrid, setAdjustedPuzzleGrid] = useState([]); // Track adjusted puzzle grid
  const [mistakes, setMistakes] = useState(0);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false); // State for lose modal
  const [difficulty, setDifficulty] = useState(0.65);
  const [passwordEnabled, setPasswordEnabled] = useState(false); // Password boolean
  const [password, setPassword] = useState(""); // Password state
  const [preFilledCells, setPreFilledCells] = useState([]); // Track pre-filled cells
  const navigate = useNavigate();
  const maxMistakes = 5;

  useEffect(() => {
    const sudoku = getSudoku("easy");
    const puzzle = sudoku.puzzle.split("");
    const solution = sudoku.solution.split("");

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

    setSolutionGrid(transformedSolution);
    setOriginalPuzzleGrid(transformedPuzzle);
    adjustPuzzleDifficulty(transformedPuzzle, transformedSolution, difficulty);
  }, [difficulty]);

  const adjustPuzzleDifficulty = (puzzle, solution, difficulty) => {
    const newPreFilledCells = [];
    const adjustedPuzzle = puzzle.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const isPreFilled = Math.random() < difficulty;
        if (isPreFilled) {
          newPreFilledCells.push({ row: rowIndex, col: colIndex });
        }
        return isPreFilled ? solution[rowIndex][colIndex] : "";
      })
    );
    setPuzzleGrid(adjustedPuzzle);
    setAdjustedPuzzleGrid(adjustedPuzzle); // Store adjusted puzzle grid
    setPreFilledCells(newPreFilledCells);
  };

  const handleCellChange = (row, col, value) => {
    if (!solutionGrid.length) {
      console.log("Solution grid is not yet initialized.");
      return;
    }

    // Prevent changes to pre-filled cells
    if (preFilledCells.some((cell) => cell.row === row && cell.col === col)) {
      toast.error("Cannot change a pre-filled cell!");
      return;
    }

    const newPuzzleGrid = [...puzzleGrid];
    const intValue = parseInt(value) || 0;

    if (intValue === solutionGrid[row][col]) {
      newPuzzleGrid[row][col] = intValue;
      toast.success("Correct value entered!");
      // Add the cell to preFilledCells to prevent future edits
      setPreFilledCells([...preFilledCells, { row, col }]);
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
    setShowCompletionModal(true);
  };

  const handleSubmit = () => {
    checkSolution(puzzleGrid);
    if (
      puzzleGrid.every((row, rowIndex) =>
        row.every((cell, colIndex) => cell === solutionGrid[rowIndex][colIndex])
      )
    ) {
      toast.success("Congratulations! You solved the puzzle!");
    } else {
      toast.error("There are still some mistakes in the puzzle.");
    }
  };

  const handleCloseModal = () => {
    setShowCompletionModal(false);
  };

  const handleCloseLoseModal = () => {
    setShowLoseModal(false);
  };

  const handleVictory = () => {
    navigate("/victory");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value === "password") {
      setPasswordEnabled(true);
    } else {
      setPasswordEnabled(false);
    }
  };

  const handleDifficultyChange = (event, newValue) => {
    setDifficulty(newValue);
    adjustPuzzleDifficulty(originalPuzzleGrid, solutionGrid, newValue);
  };

  const resetPuzzle = useCallback(() => {
    setPuzzleGrid(JSON.parse(JSON.stringify(adjustedPuzzleGrid))); // Use adjusted puzzle grid
    setMistakes(0);
  }, [adjustedPuzzleGrid]);

  useEffect(() => {
    if (mistakes >= maxMistakes) {
      toast.error("Too many mistakes! The board will be reset.");
      setShowLoseModal(true); // Show lose modal
      resetPuzzle();
    }
  }, [mistakes, resetPuzzle]);

  return (
    <Layout>
      <div className="center-container">
        <ul className="background">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
        <div className="top-container">
          <div className="mistakes-container">
            Mistakes: {mistakes}/{maxMistakes}
          </div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password for slider"
          />
        </div>
        <div className="sudoku-container">
          {passwordEnabled && (
            <Slider
              value={difficulty}
              min={0.5}
              max={1}
              step={0.01}
              onChange={handleDifficultyChange}
              valueLabelDisplay="auto"
              aria-labelledby="difficulty-slider"
            />
          )}
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
          <NumPad onNumberClick={handleNumberClick} />
          <ButtonContainer
            onReset={resetPuzzle}
            onCheckSolution={() => checkSolution(puzzleGrid)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <CompletionModal
        show={showCompletionModal}
        onClose={handleCloseModal}
        onVictory={handleVictory}
      />
      <LoseModal show={showLoseModal} onClose={handleCloseLoseModal} />
    </Layout>
  );
};

export default Sudoku;
