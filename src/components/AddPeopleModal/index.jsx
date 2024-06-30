import React, { useEffect, useState } from "react";
import "./addpeople.css";
import AddSuccessModal from "../AddSuccessModal";
import axios from "axios";

const AddPeopleModal = ({ open, onClose, onPeopleAdded }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [email, setEmail] = useState("");

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

  const openSuccess = async () => {
    try {
      const response = await axios.post(
        "https://back-topaz-three.vercel.app/api/user/add-people",
        { email: email },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      if (response.data.message === "Email added successfully") {
        setSuccessModal(true);
        // Call the callback function to update userdata in Board component
        onPeopleAdded([{ email: email }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className=" text-left">Add people to the board</h3>
        <input
          type="email"
          placeholder="Add an email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border: "1px solid rgb(210, 199, 199)",
            height: "56px",
            padding: "5px",
            borderRadius: "8px",
          }}
        />
        <div className="flex gap-3 justify-between mt-3">
          <button
            onClick={onClose}
            style={{
              color: "red",
              backgroundColor: "white",
              width: "300px",
              textAlign: "center",
              height: "45px",
              font: "poppins",
              fontWeight: "600px",
              borderRadius: "10px",
              border: "1px solid red",
            }}
          >
            Cancel
          </button>
          <button
            style={{
              color: "white",
              backgroundColor: "#17A2B8",
              width: "300px",
              textAlign: "center",
              height: "45px",
              font: "poppins",
              fontWeight: "600px",
              borderRadius: "10px",
              fontSize: "15px",
            }}
            onClick={openSuccess}
          >
            add email
          </button>
        </div>
      </div>
      <AddSuccessModal
        open={successModal}
        onClose={() => setSuccessModal(false)}
        email={email}
      />
    </div>
  );
};

export default AddPeopleModal;
