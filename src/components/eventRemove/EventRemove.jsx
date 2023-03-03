import React from "react";
import PropTypes from "prop-types";

import "./eventRemove.scss";

import { useSelector, useDispatch } from "react-redux";
import { deleteDeprecatedEvent } from "../../gateway/apiEndpoints";
import { loadEvents } from "../reducers/eventsReducer/eventsActions";

const EventRemove = ({ id }) => {
  const { eventsArr } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const removeEvent = async (id) => {
    const setRemovePermition = eventsArr.find((item) => id === item.id);

    if (
      new Date(setRemovePermition.date) < new Date() ||
      (new Date(setRemovePermition.date).getDate() === new Date().getDate() &&
        new Date(setRemovePermition.dateFrom).getHours() ===
          new Date().getHours() + 1 &&
        new Date().getMinutes() >= 45)
    ) {
      alert("You cannot delete an event less than 15 minutes before it starts");
      return;
    }
    try {
      await deleteDeprecatedEvent(id);
      dispatch(loadEvents());
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <button
      className="delete-event-btn"
      onClick={(e) => {
        e.stopPropagation();
        removeEvent(id);
      }}
    >
      <i className="fa-solid fa-trash-can"></i> Удалить
    </button>
  );
};

export default EventRemove;

EventRemove.propTypes = {
  eventsArr: PropTypes.array,
  loadData: PropTypes.func,
};
