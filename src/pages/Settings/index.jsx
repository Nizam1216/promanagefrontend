import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import profileIcon from "../../images/icons/Frame 1036.svg";
import emailIcon from "../../images/icons/Group.svg";
import eyeIcon from "../../images/icons/Group-1.svg";
import lockIcon from "../../images/icons/Group-2.svg";
import "./settings.css";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [predata, setPredata] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://back-topaz-three.vercel.app/api/user/update",
        {
          name,
          email,
          password,
          newPassword: confirmPassword,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.post(
        "https://back-topaz-three.vercel.app/api/user/getuser",
        {},
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      if (response.data.message === "user fetched successfully") {
        setPredata(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="settings-container ml-40">
        <h1 className="settings_title mt-20">Settings</h1>
        <div className="w-full flex flex-col text-center bg-white justify-center items-center">
          <form
            className="w-full justify-center items-center h-full flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <div className="w-10 flex input_div">
              <img src={profileIcon} alt="Profile Icon" />
              <input
                type="text"
                className="input_field"
                placeholder={predata.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-10 flex input_div">
              <img src={emailIcon} alt="Email Icon" />
              <input
                type="email"
                className="input_field"
                placeholder={predata.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-10 flex input_div justify-between">
              <div className="flex justify-start items-center">
                <img
                  src={lockIcon}
                  alt="Lock Icon"
                  className="w-[32px] h-[32px]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  placeholder="Current Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="items-center flex">
                <img
                  src={eyeIcon}
                  alt="Eye Icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            <div className="w-10 flex input_div justify-between">
              <div className="flex justify-start items-center">
                <img
                  src={lockIcon}
                  alt="Lock Icon"
                  className="w-[32px] h-[32px]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  placeholder="New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="items-center flex">
                <img
                  src={eyeIcon}
                  alt="Eye Icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            {errorMessage && <p className="error_message">{errorMessage}</p>}
            {successMessage && (
              <p className="success_message">{successMessage}</p>
            )}

            <button
              className="custom_btn bg-primary text-center text-white mt-8"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
