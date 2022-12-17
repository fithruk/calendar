import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./eventRemove.scss";
import { Context } from "../context/context";
import { deleteDeprecatedEvent } from "../../gateway/apiEndpoints";

const EventRemove = ({ id }) => {
  const {
    eventsStore: { eventsArr },
    loadData,
  } = useContext(Context);

  const removeEvent = async (id) => {
    const setRemovePermition = eventsArr.find((item) => id === item.id);

    if (
      new Date(setRemovePermition.date).getDate() === new Date().getDate() &&
      new Date(setRemovePermition.dateFrom).getHours() ===
        new Date().getHours() + 1 &&
      new Date().getMinutes() >= 45
    ) {
      alert("You cannot delete an event less than 15 minutes before it starts");
      return;
    }
    try {
      await deleteDeprecatedEvent(id);
      loadData();
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
