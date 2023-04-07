import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadEvents } from "../reducers/eventsReducer/eventsActions";
import "./calendar.scss";

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadEvents());
  }, []);
  const { isOpen } = useSelector((state) => state.modalWindow);
  const { error } = useSelector((state) => state.events);
  useEffect(() => {
    if (error.err) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [error]);
  return (
    <section className="calendar">
      <Navigation />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week />
          {isOpen && <Modal />}
        </div>
      </div>
    </section>
  );
};

export default Calendar;

Calendar.propTypes = {
  modalIsOpen: PropTypes.func,
};
