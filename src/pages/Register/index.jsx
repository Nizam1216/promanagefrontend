import React, { useState } from "react";
import logo from "../../images/Art.svg";
import back from "../../images/Back.png";
import profileIcon from "../../images/icons/Frame 1036.svg";
import emailIcon from "../../images/icons/Group.svg";
import eyeIcon from "../../images/icons/Group-1.svg";
import lockIcon from "../../images/icons/Group-2.svg";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsObj = {};

    if (!name.trim()) {
      errorsObj.name = "Name cannot be empty";
    }
    if (!email.trim()) {
      errorsObj.email = "Email cannot be empty";
    }
    if (!password.trim()) {
      errorsObj.password = "Password cannot be empty";
    } else if (password.length < 4) {
      errorsObj.password = "Password must be at least 4 characters long";
    }
    if (!confirmPassword.trim()) {
      errorsObj.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errorsObj.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
    } else {
      // Reset errors if there are no errors
      setErrors({});

      try {
        const response = await axios.post(
          "https://back-topaz-three.vercel.app/api/user/register",
          {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }
        );
        if (response.data.message === "User registered successfully") {
          navigate("/");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
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
            <h1 className="login_txt text-center mb-10">Register</h1>
            <div className="w-10 flex input_div">
              <img src={profileIcon} alt="Profile Icon" />
              <input
                type="text"
                className="input_field"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && (
              <p className="error_message text-red-600">{errors.name}</p>
            )}
            <div className="w-10 flex input_div">
              <img src={emailIcon} alt="Email Icon" />
              <input
                type="email"
                className="input_field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="error_message text-red-600">{errors.email}</p>
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
                  className="input_field"
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
              <p className="error_message text-red-600">{errors.password}</p>
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
                  className="input_field"
                  placeholder="Confirm Password"
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
            {errors.confirmPassword && (
              <p className="error_message text-red-600">
                {errors.confirmPassword}
              </p>
            )}
            <button
              className="custom_btn bg-primary text-center text-white mt-8"
              type="submit"
            >
              Register
            </button>
            <p className="text-gray-500 text-center mt-4">Have an account?</p>
            <button
              className="custom_btn text-primary text-center border-primary border mt-8"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
