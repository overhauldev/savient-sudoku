import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Sudoku from "./pages/Sudoku.js";
import VictoryPage from "./pages/VictoryPage.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/Sudoku" element={<Sudoku />} />
        <Route path="/Victory" element={<VictoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
