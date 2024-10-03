import React, { useState, useEffect } from 'react';
import SudokuGrid from './components/SudokuGrid';
import PuzzleControls from './components/PuzzleControls';
import axios from 'axios';
import './App.css';
console.log('App.js');
function App() {
  const [gridSize, setGridSize] = useState(4); // Default to a 4x4 grid
  const [puzzle, setPuzzle] = useState([]);
  const [message, setMessage] = useState('');

  const fetchPuzzle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/puzzle/${gridSize}`);
      setPuzzle(response.data.puzzle);
    } catch (error) {
      console.error('Error fetching puzzle:', error);
    }
  };

  const validatePuzzle = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/validate', { puzzle });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error validating puzzle:', error);
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, [gridSize]);

  return (
    <div className="App container">
      <h1>Sudoku Sum Puzzle</h1>
      <SudokuGrid gridSize={gridSize} puzzle={puzzle} setPuzzle={setPuzzle} />
      <PuzzleControls onGeneratePuzzle={fetchPuzzle} onValidatePuzzle={validatePuzzle} />
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
}

export default App;