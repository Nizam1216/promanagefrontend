import React, { useEffect } from "react";
import "./Modal.css";
import axios from "axios";

const Modal = ({ open, onClose, noteId }) => {
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://back-topaz-three.vercel.app/api/note/delete-note/${noteId}`,
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );

      if (response.data.message === "Note deleted successfully") {
        onClose(); // Close the modal upon successful deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: "440px" }}>
        <h3 className="are_you_sure">Are you sure you want to Delete?</h3>
        <div className="flex flex-col gap-3 justify-center w-[600px]">
          <button
            style={{
              color: "white",
              backgroundColor: "#17A2B8",
              width: "300px",
              height: "45px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "600",
              borderRadius: "10px",
            }}
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            style={{
              color: "red",
              backgroundColor: "white",
              width: "300px",
              height: "45px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "600",
              borderRadius: "10px",
              border: "1px solid red",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
