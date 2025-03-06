import React from "react";
import "./ConfirmationModal.css"; // Modal stilini buradan ekleyebilirsiniz

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>
            Vazgeç
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            Evet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
