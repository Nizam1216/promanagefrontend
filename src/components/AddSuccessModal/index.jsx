import React, { useEffect } from "react";
import "./successmodal.css";

const AddSuccessModal = ({ open, onClose, email }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className=" text-left">{email} added to board</h3>

        <div className="flex  gap-3 justify-beween mt-3">
          <button
            onClick={onClose}
            style={{
              color: "white",
              backgroundColor: "#17A2B8",
              width: "600px",
              textAlign: "center",
              height: "45px",
              font: "poppins",
              fontWeight: "600px",
              borderRadius: "10px",
              border: "1px solid red",
            }}
          >
            OKAY! GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSuccessModal;
