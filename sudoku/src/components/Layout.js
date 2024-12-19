import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <img
          src="/savient-logo-white.png"
          alt="Savient Sudoku"
          className="title-image"
        />
      </header>
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
