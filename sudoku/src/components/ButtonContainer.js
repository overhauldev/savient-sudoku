import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import InfoModal from "./InfoModal";

const ButtonContainer = ({ onCheckSolution }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  const handleCloseModal = () => {
    setShowInfoModal(false);
  };

  return (
    <div className="Button-container">
      <Link to="/">
        <button type="button" className="btn btn-outline-primary btn-lg">
          Home
        </button>
      </Link>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        onClick={handleInfoClick}
      >
        Info
      </button>
      <InfoModal show={showInfoModal} onClose={handleCloseModal} />
    </div>
  );
};

export default ButtonContainer;
