import React, { useState, useEffect } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { Context } from "./components/context/context.js";
import { getAllEvents } from "./gateway/apiEndpoints.js";
import { initialDateSettings } from "./gateway/events";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventsArr, setEventsArr] = useState([]);
  const [modalFormData, setModalFormData] = useState(
    ({} = initialDateSettings)
  );

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const loadData = async () => {
    try {
      const loadedEvents = await getAllEvents();
      setEventsArr(loadedEvents);
    } catch (error) {
      throw new Error(error);
    }
  };

  const store = {
    dayStartStore: { weekDates, setWeekStartDate, weekStartDate },
    eventsStore: { eventsArr, setEventsArr },
    modalIsOpenStore: { modalIsOpen, setModalIsOpen },
    modalFormStore: { modalFormData, setModalFormData },
    loadData,
  };

  useEffect(() => {
    loadData();
  }, [modalIsOpen]);

  useEffect(() => {
    loadData();
  }, [!modalIsOpen]);

  return (
    <Context.Provider value={store}>
      <Header />
      <Calendar />
    </Context.Provider>
  );
};

export default App;
