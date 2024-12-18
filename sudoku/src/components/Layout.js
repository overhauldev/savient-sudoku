import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Savient Sudoku</h1>
      </header>
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
