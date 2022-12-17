import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Context } from "../context/context";
import { months } from "../../utils/dateUtils";
import "./header.scss";

const Header = () => {
  const {
    dayStartStore: { weekDates, setWeekStartDate, weekStartDate },
    modalIsOpenStore: { setModalIsOpen },
  } = useContext(Context);

  const throwForvard = () => {
    const oneDay = Date.parse(weekStartDate);
    const days = Math.floor(1000 * 60 * 60 * 24);
    const next = oneDay + days * 7;
    setWeekStartDate(new Date(next));
  };

  const throwBack = () => {
    const oneDay = Date.parse(weekStartDate);
    const days = Math.floor(1000 * 60 * 60 * 24);
    const next = oneDay - days * 7;
    setWeekStartDate(new Date(next));
  };

  const throwNow = () => {
    setWeekStartDate(new Date());
  };

  const displayedMonth = Array.from(weekDates)
    .map((time) => new Date(time).getMonth())
    .filter((num, ind, arr) => {
      return arr.indexOf(num) === ind;
    })
    .map((month) => (
      <span className="current-month" key={month}>
        {`${months[month].substring(0, 3)}  `}
      </span>
    ));
  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => setModalIsOpen(true)}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>
        Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={throwNow}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-left" onClick={throwBack}></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-right" onClick={throwForvard}></i>
        </button>
        <span className="navigation__displayed-month">{displayedMonth}</span>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  setModalIsOpen: PropTypes.func,
  weekDates: PropTypes.array,
  setWeekStartDate: PropTypes.func,
  weekStartDate: PropTypes.object,
};
