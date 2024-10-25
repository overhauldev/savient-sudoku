import React from "react";
import "./CompletionModal.css";

const CompletionModal = ({ show, onClose, onVictory }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>The puzzle is complete!</h2>
        <button className="btn btn-outline-primary btn-lg" onClick={onVictory}>
          Go to Victory Page
        </button>
        <button className="btn btn-outline-secondary btn-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;
