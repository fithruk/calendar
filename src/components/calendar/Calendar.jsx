import React from "react";
import PropTypes from "prop-types";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";

import { useSelector, useDispatch } from "react-redux";

import "./calendar.scss";

const Calendar = () => {
  const { isOpen } = useSelector((state) => state.modalWindow);

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
