import React, { useContext } from "react";
import PropTypes from "prop-types";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";

import { Context } from "../context/context";

import "./calendar.scss";

const Calendar = () => {
  const {
    modalIsOpenStore: { modalIsOpen },
  } = useContext(Context);

  return (
    <section className="calendar">
      <Navigation />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week />
          {modalIsOpen && <Modal />}
        </div>
      </div>
    </section>
  );
};

export default Calendar;

Calendar.propTypes = {
  modalIsOpen: PropTypes.func,
};
