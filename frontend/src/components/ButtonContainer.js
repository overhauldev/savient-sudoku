import React from "react";
import { Link } from "react-router-dom";

const ButtonContainer = () => {
  return (
    <div className="button-container">
      <Link to="/">
        <button type="button" className="btn btn-outline-primary">
          Home
        </button>
      </Link>
      <button type="button" className="btn btn-outline-primary">
        Reset
      </button>
    </div>
  );
};

export default ButtonContainer;
