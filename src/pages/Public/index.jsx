import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import promanageIcon from "../../images/dashboadicons/promanage.png";
import highPriority from "../../images/dashboadicons/highPriority.svg";
import lowPriority from "../../images/dashboadicons/lowPriority.svg";
import moderatePriority from "../../images/dashboadicons/moderatePriority.svg";
import axios from "axios";
import "./public.css"; // Import your CSS file

const Public = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);

  const getPriorityImage = (priority) => {
    if (priority === "high") {
      return highPriority;
    } else if (priority === "moderate") {
      return moderatePriority;
    } else {
      return lowPriority;
    }
  };

  useEffect(() => {
    const getOneNote = async () => {
      try {
        const response = await axios.get(
          `https://back-topaz-three.vercel.app/api/note/get-one-note/${id}`
        );
        if (response.data.message === "Note fetched successfully") {
          setData(response.data.oneNote);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOneNote();
  }, [id]);

  const convertDateToReadableFormat = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  };

  const getOrdinalSuffix = (number) => {
    if (number === 11 || number === 12 || number === 13) {
      return "th";
    }
    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <>
      <div className="icon-section">
        <img src={promanageIcon} alt="Project Icon" />
      </div>
      <div className="public-container">
        {data && (
          <div className="content-section">
            <div className="card23">
              {data.priority && (
                <img
                  src={getPriorityImage(data.priority)}
                  alt="Priority Icon"
                  className="priority-icon"
                />
              )}
              <h1 className="ttll">{data.title}</h1>
              <p className="chck">
                Checklist ({data.tasks.filter((task) => task.status).length}/
                {data.tasks.length})
              </p>
              <div className="task-list">
                {data.tasks.map((task, index) => (
                  <div key={index} className="task">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={task.status}
                      readOnly
                    />
                    <span className="task-text">{task.text}</span>
                  </div>
                ))}
              </div>
              {data.dueDate !== "" && (
                <div className="due-date-section">
                  <h1 className="due-date-label">Due Date</h1>
                  <p className="due-date">
                    {convertDateToReadableFormat(data.dueDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Public;
