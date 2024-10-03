import React from 'react';

const PuzzleControls = ({ onGeneratePuzzle, onValidatePuzzle }) => {
  return (
    <div className="puzzle-controls">
      <button className="btn btn-primary" onClick={onGeneratePuzzle}>
        New Puzzle
      </button>
      <button className="btn btn-success" onClick={onValidatePuzzle}>
        Validate Puzzle
      </button>
    </div>
  );
};

export default PuzzleControls;