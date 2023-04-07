import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  leaveCurrentSession,
  setMessages,
} from "../reducers/eventsReducer/eventsActions";

import { months } from "../../utils/dateUtils";
import "./header.scss";

const Header = () => {
  const { weekDates, weekStartDate } = useSelector((state) => state.actualWeek);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const throwForvard = () => {
    const oneDay = Date.parse(weekStartDate);
    const days = Math.floor(1000 * 60 * 60 * 24);
    const next = oneDay + days * 7;
    dispatch({ type: "SET_NEW_DATE", payload: new Date(next) });
    dispatch({ type: "SET_NEW_WEEK" });
  };

  const throwBack = () => {
    const oneDay = Date.parse(weekStartDate);
    const days = Math.floor(1000 * 60 * 60 * 24);
    const next = oneDay - days * 7;
    dispatch({ type: "SET_NEW_DATE", payload: new Date(next) });
    dispatch({ type: "SET_NEW_WEEK" });
  };

  const throwNow = () => {
    dispatch({ type: "SET_NEW_DATE", payload: new Date() });
    dispatch({ type: "SET_NEW_WEEK" });
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

  const leaveHandler = async () => {
    const res = await leaveCurrentSession();
    dispatch(setMessages(res));
    navigate("/");
  };

  return (
    <header className="header">
      <div className="wrapper">
        <button
          className="button create-event-btn"
          onClick={() => dispatch({ type: "TOGGLE_OPEN_MODAL" })}
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
      </div>
      <Button variant="contained" onClick={leaveHandler}>
        Logout
      </Button>
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
