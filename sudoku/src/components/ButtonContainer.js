import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const ButtonContainer = () => {
  return (
    <div className="Button-container">
      <button type="button" className="btn btn-outline-primary btn-lg">
        Reset
      </button>
      <Link to="/">
        <button type="button" className="btn btn-outline-primary btn-lg">
          Home
        </button>
      </Link>
      <button type="button" className="btn btn-outline-primary btn-lg">
        Info
      </button>
    </div>
  );
};

export default ButtonContainer;
