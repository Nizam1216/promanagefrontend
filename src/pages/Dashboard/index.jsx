import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./dashboard.css";
import addPeopleIcon from "../../images/dashboadicons/addPople.svg";
import BacklogCard from "../../components/BacklogCard";
import AddPeopleModal from "../../components/AddPeopleModal";
import axios from "axios";

const Board = () => {
  const [addPeopleModalOpen, setAddPeopleModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [sampleData, setSampleData] = useState([]);
  const [inproData, setInproData] = useState([]);
  const [backlogData, setBacklogData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [dateRange, setDateRange] = useState("day");
  const [userdata, setUserdata] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, userdata, allData]);

  const getNotes = async () => {
    await getTodoNotes();
    await getInProgressNotes();
    await getDoneNotes();
    await getBacklogNotes();
    getAllNotes();
  };

  const getAllNotes = async () => {
    const response = await axios.post(
      "https://back-topaz-three.vercel.app/api/note/get-notes",
      { dateRange },
      {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      }
    );
    setAllData(response.data.userNotes);
  };

  const getTodoNotes = async () => {
    const response = await axios.post(
      "https://back-topaz-three.vercel.app/api/note/get-todo-notes",
      { dateRange },
      {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      }
    );
    setSampleData(response.data.userNotes);
  };

  const getInProgressNotes = async () => {
    const response = await axios.post(
      "https://back-topaz-three.vercel.app/api/note/get-in-progress-notes",
      { dateRange },
      {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      }
    );
    setInproData(response.data.userNotes);
  };

  const getDoneNotes = async () => {
    const response = await axios.post(
      "https://back-topaz-three.vercel.app/api/note/get-done-notes",
      { dateRange },
      {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      }
    );
    setDoneData(response.data.userNotes);
  };

  const getBacklogNotes = async () => {
    const response = await axios.post(
      "https://back-topaz-three.vercel.app/api/note/get-backlog-notes",
      { dateRange },
      {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      }
    );
    setBacklogData(response.data.userNotes);
  };

  const getUser = async () => {
    const response = await axios.post(
      "https://back-topaz-three.vercel.app/api/user/getuser",
      {},
      {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      }
    );
    setUserdata(response.data.user.assigndTo || []);
    setUsername(response.data?.user?.name);
  };

  const handleNoteUpdate = (updatedNote) => {
    setSampleData((prevData) =>
      prevData.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
    setInproData((prevData) =>
      prevData.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
    setDoneData((prevData) =>
      prevData.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
    setBacklogData((prevData) =>
      prevData.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
  };

  const handlePeopleAdded = (newPeople) => {
    setUserdata((prevUserdata) =>
      Array.isArray(prevUserdata) ? [...prevUserdata, ...newPeople] : newPeople
    );
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <div className="header">
          <h1 className="home_title">Welcome! {username}</h1>
          {localStorage.getItem("url") ? (
            <button className="link_copied">link copied</button>
          ) : (
            <p className="home_date">{new Date().toLocaleDateString()}</p>
          )}
        </div>
        <div className="controls">
          <div className="flex gap-3">
            <h1 className="home_title">Board</h1>
            <img
              src={addPeopleIcon}
              alt="..."
              className="cursor-pointer"
              onClick={() => setAddPeopleModalOpen(true)}
            />
          </div>
          <div className="dropdown_for_sort">
            <select
              className="dropdown"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="day">This Day</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className="cards_div">
          <div>
            <BacklogCard
              data={backlogData}
              title={"Backlog"}
              onNoteUpdate={handleNoteUpdate}
            />
          </div>
          <div>
            <BacklogCard
              data={sampleData}
              title={"Todo"}
              add={true}
              onNoteUpdate={handleNoteUpdate}
            />
          </div>
          <div>
            <BacklogCard
              data={inproData}
              title={"in-progress"}
              onNoteUpdate={handleNoteUpdate}
            />
          </div>
          <div>
            <BacklogCard
              data={doneData}
              title={"Done"}
              onNoteUpdate={handleNoteUpdate}
            />
          </div>
        </div>
      </div>
      <AddPeopleModal
        open={addPeopleModalOpen}
        onClose={() => setAddPeopleModalOpen(false)}
        onPeopleAdded={handlePeopleAdded}
      />
    </div>
  );
};

export default Board;
