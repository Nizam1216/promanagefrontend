import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditModal.css";
import highPriority from "../../images/dashboadicons/highPriority.svg";
import lowPriority from "../../images/dashboadicons/lowPriority.svg";
import moderatePriority from "../../images/dashboadicons/moderatePriority.svg";
import deleteIcon from "../../images/dashboadicons/Delete.svg";
import addNew from "../../images/dashboadicons/addNew.svg";
import dots from "../../images/dashboadicons/Arrow Down.png";

const EditModal = ({ open, onClose, card }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [dateType, setDateType] = useState(false);
  const [predata, setPredata] = useState([]);
  const [openOptions, setOpenOptions] = useState(null);

  useEffect(() => {
    if (card) {
      setTitle(card.title || "");
      setPriority(card.priority || "");
      setDueDate(card.dueDate || "");
      setTasks(card.tasks || []);
      setAssignedTo(card.assignedTo || []);
    }
  }, [card]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tasksWithStatus = tasks.map((task) => ({
      text: task.text,
      completed: task.completed,
      taskStatus: task.completed,
    }));

    try {
      const response = await axios.post(
        `https://back-topaz-three.vercel.app/api/note/edit-note/${card._id}`,
        {
          title,
          priority,
          dueDate,
          tasks: tasksWithStatus,
          assignedTo,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      console.log(response.data.message);
      onClose();
    } catch (error) {
      console.error("Error editing note", error);
    }
  };

  const handleAddTask = () => {
    setTasks([...tasks, { text: "", completed: false }]);
  };

  const handleTaskChange = (index, newValue) => {
    const newTasks = [...tasks];
    newTasks[index].text = newValue;
    setTasks(newTasks);
  };

  const handleTaskDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };

  const handleAssignToggle = (email) => {
    if (assignedTo.includes(email)) {
      setAssignedTo(assignedTo.filter((assigned) => assigned !== email));
    } else {
      setAssignedTo([...assignedTo, email]);
    }
  };

  const toggleOptions = (index) => {
    if (openOptions === index) {
      setOpenOptions(null);
    } else {
      setOpenOptions(index);
    }
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleCheckboxChange = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  if (!open) return null;

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ width: "666px", height: "596px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group flex justify-between">
            <label>Priority</label>
            <img
              src={highPriority}
              alt="High Priority"
              className={`cursor-pointer h-[20px] ${
                priority === "high" ? "border-red" : ""
              }`}
              onClick={() => handlePriorityChange("high")}
            />
            <img
              src={lowPriority}
              alt="Low Priority"
              className={`cursor-pointer h-[20px] ${
                priority === "low" ? "border-red" : ""
              }`}
              onClick={() => handlePriorityChange("low")}
            />
            <img
              src={moderatePriority}
              alt="Moderate Priority"
              className={`cursor-pointer h-[20px] ${
                priority === "moderate" ? "border-red" : ""
              }`}
              onClick={() => handlePriorityChange("moderate")}
            />
          </div>
          <div className="form-group flex gap-3 items-center w-full absolute">
            <label>Assign To</label>
            <div className="relative">
              <div
                className="assign_to_email_div"
                onClick={() => toggleOptions("assign")}
              >
                assign to the people whom you have added{" "}
                <img src={dots} alt="..." />
              </div>

              {openOptions === "assign" && (
                <div className="options2 flex flex-col">
                  {predata.addedPeople?.map((email) => (
                    <div
                      key={email}
                      className="flex justify-between items-center"
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            backgroundColor: "#ddd",
                          }}
                        >
                          {email.slice(0, 2).toUpperCase()}
                        </div>
                        <h1
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "21px",
                            textAlign: "left",
                            padding: "5px",
                            marginBottom: "6px",
                            cursor: "pointer",
                          }}
                        >
                          {email}
                        </h1>
                      </div>
                      <div>
                        {assignedTo.includes(email) ? (
                          <button
                            type="button"
                            onClick={() => handleAssignToggle(email)}
                            className="bg-gray-400 text-white"
                            style={{
                              width: "104px",
                              height: "31px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Unassign
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAssignToggle(email)}
                            style={{
                              border: "1px solid #E2E2E2",
                              width: "104px",
                              height: "31px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Assign
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="form-group mt-20">
            <label>
              Checklist ({completedTasks}/{tasks.length})
            </label>
            <button type="button" onClick={handleAddTask}>
              <img src={addNew} alt="Add New Task" />
            </button>
            <div className="overflow-y-scroll" style={{ height: "160px" }}>
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="task_grp flex justify-start mb-2"
                  style={{ borderRadius: "9px" }}
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <input
                    type="text"
                    className="no_border border border-none"
                    value={task.text}
                    placeholder="Write your task here"
                    onChange={(e) => handleTaskChange(index, e.target.value)}
                    style={{ border: "none" }}
                  />
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    onClick={() => handleTaskDelete(index)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              {!dateType ? (
                <input
                  type="date"
                  value={dueDate}
                  onChange={handleDateChange}
                />
              ) : (
                <div>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={handleDateChange}
                  />
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="addnew"
                style={{ left: 23 }}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="addnew" style={{ left: 23 }}>
                Edit Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
