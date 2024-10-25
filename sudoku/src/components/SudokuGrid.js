import React from "react";
import Cell from "./Cell";

const SudokuGrid = ({
  puzzle,
  onCellChange,
  onCellSelect,
  selectedCell,
  selectedNumber,
}) => {
  const getBlockIndices = (index) => {
    const start = Math.floor(index / 3) * 3;
    return [start, start + 1, start + 2];
  };

  const blockRows =
    selectedCell.row !== null ? getBlockIndices(selectedCell.row) : [];
  const blockCols =
    selectedCell.col !== null ? getBlockIndices(selectedCell.col) : [];

  return (
    <div className="sudoku-grid">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
              onClick={() => {
                onCellSelect(rowIndex, colIndex, cell);
                if (cell !== "") {
                  onCellSelect(rowIndex, colIndex, cell);
                } else {
                  onCellSelect(rowIndex, colIndex, null);
                }
              }}
              selected={
                selectedCell.row === rowIndex && selectedCell.col === colIndex
              }
              highlightRow={selectedCell.row === rowIndex}
              highlightCol={selectedCell.col === colIndex}
              highlightBlock={
                blockRows.includes(rowIndex) && blockCols.includes(colIndex)
              }
              highlightSameNumber={
                selectedNumber !== null && selectedNumber === cell
              }
              readOnly={cell !== ""}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
