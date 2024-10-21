import React from "react";

const Cell = ({ value, onChange, readOnly }) => {
  return (
    <input
      type="text"
      className="sudoku-cell"
      value={value}
      onChange={onChange}
      maxLength="1"
      readOnly={readOnly}
    />
  );
};

export default Cell;
