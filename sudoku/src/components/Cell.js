import React from "react";

const Cell = ({
  value,
  onChange,
  onClick,
  selected,
  highlightRow,
  highlightCol,
  highlightBlock,
  highlightSameNumber,
  readOnly,
}) => {
  let className = "sudoku-cell";
  if (selected) className += " selected";
  if (highlightRow) className += " highlight-row";
  if (highlightCol) className += " highlight-col";
  if (highlightBlock) className += " highlight-block";
  if (highlightSameNumber) className += " highlight-same-number";

  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={onChange}
      onClick={onClick}
      maxLength="1"
      readOnly={readOnly}
    />
  );
};

export default Cell;
