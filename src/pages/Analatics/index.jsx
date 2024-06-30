import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./analytics.css";
import axios from "axios";
const Analytics = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAnalytics();
  }, [data]);
  const getAnalytics = async () => {
    try {
      const response = await axios.post(
        "https://back-topaz-three.vercel.app/api/note/analytics",
        {},
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      if (response.data.message === "analytics fetched successfully") {
        setData(response.data.analyticsData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="ml-24">
        <h1 className="settings_title  mt-20">Analytics</h1>
        <div className="flex gap-24">
          <div className="mt-10">
            <ul>
              <li className="p-4">
                <h3 className="list_style">
                  Backlog Tasks{" "}
                  <span className="ml-24 pl-2">{data.backlogTasks}</span>
                </h3>
              </li>
              <li className="p-4">
                <h3 className="list_style">
                  To-do Tasks <span className="ml-32">{data.todoTasks}</span>
                </h3>
              </li>
              <li className="p-4">
                <h3 className="list_style">
                  In-Progress Tasks{" "}
                  <span className="ml-20">{data.inProgressTasks}</span>
                </h3>
              </li>
              <li className="p-4">
                <h3 className="list_style">
                  Completed Tasks{" "}
                  <span className="ml-20 pl-1">{data.completedTasks}</span>
                </h3>
              </li>
            </ul>
          </div>
          <div className="mt-10">
            <ul>
              <li className="p-4">
                <h3 className="list_style">
                  Low Priority <span className="ml-28">{data.lowPriority}</span>
                </h3>
              </li>
              <li className="p-4">
                <h3 className="list_style">
                  Moderate Priority{" "}
                  <span className="ml-16 pl-1">{data.moderatePriority}</span>
                </h3>
              </li>
              <li className="p-4">
                <h3 className="list_style">
                  High Priority
                  <span className="ml-28">{data.highPriority}</span>
                </h3>
              </li>
              <li className="p-4">
                <h3 className="list_style">
                  Due Date Tasks{" "}
                  <span className="ml-20 pl-1">{data.dueDateTasks}</span>
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
