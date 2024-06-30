import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sidebar.css";
import proImage from "../images/dashboadicons/promanage.png";
import layout from "../images/dashboadicons/Group 3.png";
import settings from "../images/dashboadicons/Group 5.png";
import analytics from "../images/dashboadicons/Group 4.png";
import logout from "../images/dashboadicons/logout.svg";
import dashboardpassiveIcon from "../images/dashboadicons/dashboardpassiveIcon.svg";
import analyticsActiveIcon from "../images/dashboadicons/analyticsActiveIcon.svg";
import settingsActiveIcon from "../images/dashboadicons/settingsActiveIcon.svg";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="sidebar">
      <Link to="/dashboard">
        <img src={proImage} alt="..." />
      </Link>
      <div className="sidebar-item">
        <Link to="/dashboard">
          {" "}
          {path === "/dashboard" ? (
            <img src={layout} alt="..." />
          ) : (
            <img src={dashboardpassiveIcon} alt="..." />
          )}
        </Link>
        {/* <Link to="/dashboard">Board</Link> */}
      </div>
      <div className="sidebar-item">
        <Link to="/analytics">
          {" "}
          {path === "/analytics" ? (
            <img src={analyticsActiveIcon} alt="..." />
          ) : (
            <img src={analytics} alt="..." />
          )}
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/settings">
          {" "}
          {path === "/settings" ? (
            <img src={settingsActiveIcon} alt="..." />
          ) : (
            <img src={settings} alt="..." />
          )}
        </Link>
      </div>
      <div
        className="sidebar-item absolute bottom-0 text-red-600 cursor-pointer"
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/");
        }}
      >
        <img src={logout} alt="..." />
      </div>
    </div>
  );
};

export default Sidebar;
