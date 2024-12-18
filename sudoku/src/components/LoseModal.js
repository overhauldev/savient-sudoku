// filepath: /c:/Projects/sudoku-puzzle/sudoku/src/components/LoseModal.js
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const LoseModal = ({ show, onClose }) => {
  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="lose-modal-title"
      aria-describedby="lose-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <h2 id="lose-modal-title">You Lost!</h2>
        <p id="lose-modal-description">
          Too many mistakes. The board will be reset.
        </p>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default LoseModal;
