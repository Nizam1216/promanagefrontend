import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Board from "./pages/Dashboard";

import Settings from "./pages/Settings";
import Public from "./pages/Public";
import Analatics from "./pages/Analatics";
// ProtectedRoute component
const ProtectedRoute = ({ element: Element }) => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? <Element /> : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/public/:id" element={<Public />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Board} />} />
        <Route
          path="/analytics"
          element={<ProtectedRoute element={Analatics} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={Settings} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
