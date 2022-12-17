import React, { useState } from "react";
import PropTypes from "prop-types";

import EventRemove from "../eventRemove/EventRemove";
import "./event.scss";

const Event = ({ height, marginTop, title, time, id }) => {
  const [removeBtn, setRemoveBtn] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <div
      style={eventStyle}
      className="event"
      onMouseEnter={() => {
        setRemoveBtn(true);
      }}
      onMouseLeave={() => {
        setRemoveBtn(false);
      }}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {removeBtn && <EventRemove id={id} />}
    </div>
  );
};

export default Event;

Event.propTypes = {
  height: PropTypes.number,
  marginTop: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.string,
};
