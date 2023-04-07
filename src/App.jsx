import React, { useEffect } from "react";
import CalendarPage from "./components/calendarPage/CalendarPage.jsx";
import RegistrationPage from "./components/reegisterPage/Page.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./common.scss";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
