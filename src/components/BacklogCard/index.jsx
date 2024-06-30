import React, { useState } from "react";
import axios from "axios";
import "./BacklogCard.css";
import toggleall from "../../images/dashboadicons/Group.svg";
import highPriority from "../../images/dashboadicons/highPriority.svg";
import lowPriority from "../../images/dashboadicons/lowPriority.svg";
import moderatePriority from "../../images/dashboadicons/moderatePriority.svg";
import arrowUp from "../../images/dashboadicons/ArrowUp.png";
import arrowDown from "../../images/dashboadicons/Arrow Down.png";
import dots from "../../images/dashboadicons/dots.svg";
import Modal from "../Modal";
import EditModal from "../EditModel";
import AddNoteModal from "../AddNoteModal";

const BacklogCard = ({ data, title, add, onNoteUpdate }) => {
  const [openTasks, setOpenTasks] = useState(data.map(() => false));
  const [openAll, setOpenAll] = useState(false);
  const [openOptions, setOpenOptions] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null); // State to hold current note ID
  const [currentCard, setCurrentCard] = useState([]);
  const [url, seturl] = useState("");
  const toggleTask = (index) => {
    const newOpenTasks = [...openTasks];
    newOpenTasks[index] = !newOpenTasks[index];
    setOpenTasks(newOpenTasks);
  };

  const toggleAllTasks = () => {
    setOpenAll(!openAll);
    setOpenTasks(openTasks.map(() => !openAll));
  };

  const getPriorityImage = (priority) => {
    if (priority === "high") {
      return highPriority;
    } else if (priority === "moderate") {
      return moderatePriority;
    } else {
      return lowPriority;
    }
  };

  const toggleOptions = (index) => {
    if (openOptions === index) {
      setOpenOptions(null);
    } else {
      setOpenOptions(index);
    }
  };

  const handleDeleteClick = (noteId) => {
    setCurrentNoteId(noteId);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (card) => {
    setCurrentCard(card); // Set current card
    setEditModalOpen(true);
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleMoveToLog = (noteId, log) => {
    axios
      .post(
        `https://back-topaz-three.vercel.app/api/note/edit-note/${noteId}`,
        {
          taskStatus: log.toLowerCase(),
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      )
      .then((response) => {
        onNoteUpdate(response.data.updatedNote);
      })
      .catch((error) => {
        console.error("Error moving note to log", error);
      });
  };

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

    return `${month}-${day}`;
  };

  const handleShareClick = (noteId) => {
    const shareURL = `${https://promanagefrontend-theta.vercel.app}/public/${noteId}`;
    navigator.clipboard
      .writeText(shareURL)
      .then(() => {
        console.log(`URL copied to clipboard: ${shareURL}`);
        // Optionally, show a notification or update UI to indicate successful copy
        seturl(shareURL);
        localStorage.setItem("url", url);
        setTimeout(() => {
          seturl("");
          localStorage.removeItem("url");
        }, 8000);
      })
      .catch((error) => {
        console.error("Failed to copy URL to clipboard", error);
      });
  };

  return (
    <div className="backlog-container">
      {add ? (
        <div className="flex justify-between">
          <h2>{title}</h2>
          <div className="flex gap-5">
            <h3
              style={{ fontSize: "22px", color: "grey", cursor: "pointer" }}
              onClick={handleAddClick}
            >
              +
            </h3>
            <img
              className="toggle-all-btn"
              src={toggleall}
              alt="..."
              onClick={toggleAllTasks}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <h2>{title}</h2>
          <img
            className="toggle-all-btn"
            src={toggleall}
            alt="..."
            onClick={toggleAllTasks}
          />
        </div>
      )}

      <div className="cards_dup_main_div">
        {data.map((card, index) => {
          const completedTasks = card.tasks.filter(
            (task) => task.status
          ).length;
          return (
            <div key={card._id} className="card_dup">
              <div className="flex justify-between items-center mb-3 relative">
                <div className="flex gap-3 items-center">
                  {card.priority && (
                    <img
                      src={getPriorityImage(card.priority)}
                      alt="priority"
                      style={{ width: "100px", height: "24px" }}
                    />
                  )}
                  {card.assignedTo[0] !== "" ? (
                    card.assignedTo.map((item, index) => (
                      <h1
                        key={index}
                        style={{
                          display: "flex",
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          backgroundColor: "#ddd",
                          fontSize: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item.slice(0, 2).toUpperCase()}
                      </h1>
                    ))
                  ) : (
                    <h1
                      style={{
                        display: "flex",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: "#ffff",
                        fontSize: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#ffff",
                      }}
                    >
                      AK
                    </h1>
                  )}
                </div>
                <div className="relative">
                  <img
                    src={dots}
                    alt="..."
                    className="cursor-pointer"
                    onClick={() => toggleOptions(index)}
                  />
                  {openOptions === index && (
                    <div className="options">
                      <button
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
                        onClick={() => handleEditClick(card)}
                        disabled={
                          card.creatdBy !== localStorage.getItem("email")
                        }
                      >
                        Edit
                      </button>
                      <br />
                      <button
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
                        onClick={() => handleShareClick(card._id)}
                      >
                        Share
                      </button>
                      <br />
                      <button
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "21px",
                          textAlign: "left",
                          padding: "5px",
                          marginBottom: "3px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteClick(card._id)}
                        disabled={
                          card.creatdBy !== localStorage.getItem("email")
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <h1 className="card_title_name">{card.title}</h1>
              <div className="card-header" onClick={() => toggleTask(index)}>
                <h3 className="checklist">
                  Checklist ({completedTasks}/{card.tasks.length})
                </h3>
                <button className="toggle-btn">
                  {openTasks[index] ? (
                    <img src={arrowDown} alt="..." />
                  ) : (
                    <img src={arrowUp} alt="..." />
                  )}
                </button>
              </div>
              {openTasks[index] && (
                <div className="task-list">
                  {card.tasks.map((task, idx) => (
                    <div key={idx} className="task">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={task.status}
                        onChange={() => {
                          const newTasks = [...card.tasks];
                          newTasks[idx].status = !newTasks[idx].status;
                          axios
                            .post(
                              `https://back-topaz-three.vercel.app/api/note/edit-note/${card._id}`,
                              {
                                tasks: newTasks,
                              },
                              {
                                headers: {
                                  authToken: localStorage.getItem("authToken"),
                                },
                              }
                            )
                            .then((response) => {
                              onNoteUpdate(response.data.updatedNote);
                            })
                            .catch((error) => {
                              console.error("Error updating note", error);
                            });
                        }}
                      />{" "}
                      {task.text}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between mt-7">
                {!isNaN(card.dueDate) ? (
                  <p style={{ backgroundColor: "white", color: "white" }}>
                    whi
                  </p>
                ) : (
                  <p
                    className="card_date"
                    style={{
                      backgroundColor:
                        new Date(card.dueDate) <= new Date()
                          ? "#CF3636"
                          : "green",
                    }}
                  >
                    {convertDateToReadableFormat(card.dueDate)}
                  </p>
                )}

                <div className="flex justify-between gap-1">
                  {title !== "Backlog" && (
                    <button
                      className="change_btns"
                      onClick={() => handleMoveToLog(card._id, "Backlog")}
                    >
                      Backlog
                    </button>
                  )}
                  {title !== "in-progress" && (
                    <button
                      className="change_btns"
                      onClick={() => handleMoveToLog(card._id, "Progress")}
                    >
                      Progress
                    </button>
                  )}
                  {title !== "Todo" && (
                    <button
                      className="change_btns"
                      onClick={() => handleMoveToLog(card._id, "Todo")}
                    >
                      Todo
                    </button>
                  )}
                  {title !== "Done" && (
                    <button
                      className="change_btns"
                      onClick={() => handleMoveToLog(card._id, "Done")}
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        noteId={currentNoteId}
      />
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        card={currentCard} // Pass current card as prop
      />
      <AddNoteModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </div>
  );
};

export default BacklogCard;
