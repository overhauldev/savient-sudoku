// filepath: /c:/Projects/sudoku-puzzle/sudoku/src/components/ButtonContainer.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import InfoModal from "./InfoModal";
import ConfirmModal from "./ConfirmModal";

const ButtonContainer = ({ onCheckSolution }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const handleHomeClick = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmNavigation = () => {
    setShowConfirmModal(false);
    navigate("/");
  };

  return (
    <div className="Button-container">
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        onClick={handleHomeClick}
      >
        Home
      </button>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        onClick={handleInfoClick}
      >
        Info
      </button>
      <InfoModal show={showInfoModal} onClose={handleCloseInfoModal} />
      <ConfirmModal
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmNavigation}
      />
    </div>
  );
};

export default ButtonContainer;
