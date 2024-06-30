import React, { useState } from "react";
import logo from "../../images/Art.svg";
import back from "../../images/Back.png";
import emailIcon from "../../images/icons/Group.svg";

import eyeIcon from "../../images/icons/Group-1.svg";
import lockIcon from "../../images/icons/Group-2.svg";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsObj = {};

    if (!email.trim()) {
      errorsObj.email = "Email cannot be empty enter your email";
    }
    if (!password.trim()) {
      errorsObj.password =
        "Password cannot be empty must be more than 3 digits";
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
    } else {
      // Reset errors if there are no errors
      setErrors({});
      setErrorMessage("");
      try {
        const response = await axios.post(
          "https://back-topaz-three.vercel.app/api/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log();
        if (response.data.message === "Logged in Successfully") {
          localStorage.setItem("authToken", response.data.authToken);
          localStorage.setItem("email", response.data.email);
          navigate("/dashboard");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          // If server responded with a status other than 2xx
          setErrorMessage(error.response.data.message);
          alert(errorMessage);
        } else {
          // Other errors
          setErrorMessage("An error occurred. Please try again.");
          alert(errorMessage);
        }
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex w-full h-[100vh]">
        <div className="w-[58%] flex flex-col text-center bg-primary justify-center align-center">
          <div
            style={{
              backgroundImage: `url(${back})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="w-full h-[500px] -ml-4 mt-20"
              src={logo}
              alt="..."
            />
          </div>
          <h1 className="welcome_text -mt-16">Welcome aboard my friend</h1>
          <p className="subtitle -mt-3">just a couple of clicks and we start</p>
        </div>
        <div className="w-[42%] flex flex-col text-center bg-white justify-center items-center">
          <form
            className="w-full justify-center items-center h-full flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <h1 className="login_txt text-center mb-10">Login</h1>

            <div className="w-10 flex input_div">
              <img src={emailIcon} alt="email Icon" />
              <input
                type="email"
                className="input_field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="error_message text-start text-red-600 ">
                {errors.email}
              </p>
            )}

            <div className="w-10 flex input_div justify-between">
              <div className="flex justify-start items-center">
                <img
                  src={lockIcon}
                  alt="Lock Icon"
                  className="w-[32px] h-[32px]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input_field w-full"
                  placeholder="Password"
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
            {errors.password && (
              <p className="error_message text-left text-red-600">
                {errors.password}
              </p>
            )}
            <button
              className="custom_btn bg-primary text-center text-white mt-8"
              type="submit"
            >
              Login
            </button>

            <p className="text-gray-500 text-center mt-4">
              Have no account yet?
            </p>

            <button
              className="custom_btn text-primary text-center border-primary border mt-8"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
