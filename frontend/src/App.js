import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import TemplatePage from "./pages/TemplatePage";
import Sudoku from "./pages/Sudoku";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/TemplatePage" element={<TemplatePage />} />
        <Route path="/Sudoku" element={<Sudoku />} />
      </Routes>
    </Router>
  );
}
export default App;
