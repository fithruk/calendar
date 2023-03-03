import React, { useEffect } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { useDispatch } from "react-redux";

import { loadEvents } from "./components/reducers/eventsReducer/eventsActions.js";

import "./common.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEvents());
  }, []);

  return (
    <>
      <Header />
      <Calendar />
    </>
  );
};

export default App;
