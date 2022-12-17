import React from "react";
import Hour from "../hour/Hour";
import PropTypes from "prop-types";

import "./day.scss";

const Day = ({ dataDay, dayEvents }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay.getDate()}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataDay={dataDay}
            dataHour={hour}
            hourEvents={hourEvents}
            month={dataDay.getMonth()}
          />
        );
      })}
    </div>
  );
};

export default Day;

Day.propTypes = {
  dataDay: PropTypes.object,
  dayEvents: PropTypes.array,
};
