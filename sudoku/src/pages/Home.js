import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import InfoModal from "../components/InfoModal";

function Home() {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => setShowInfoModal(true);
  const handleCloseInfoModal = () => setShowInfoModal(false);

  return (
    <div className="App-header">
      <ul className="background">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
      <h1>Numeration Badge: Sudoku!</h1>
      <p>Hello agents! Complete this puzzle to earn a secret badge!</p>
      <div className="button-row">
        <div>
          <Link to="/Sudoku">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg fixed-size-button"
            >
              Start
            </button>
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary btn-lg fixed-size-button"
            onClick={handleShowInfoModal}
          >
            Help!
          </button>
        </div>
      </div>
      <InfoModal show={showInfoModal} onClose={handleCloseInfoModal} />
    </div>
  );
}

export default Home;
