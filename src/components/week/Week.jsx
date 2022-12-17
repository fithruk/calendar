import React, { useContext } from "react";
import PropTypes from "prop-types";

import Day from "../day/Day";
import { Context } from "../context/context";
import "./week.scss";

const Week = () => {
  const {
    dayStartStore: { weekDates },
    eventsStore: { eventsArr },
  } = useContext(Context);

  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = eventsArr.filter((event) => {
          return (
            new Date(event.dateFrom) > dayStart &&
            new Date(event.dateTo) < dayEnd
          );
        });
        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;

Day.propTypes = {
  weekDates: PropTypes.array,
  eventsArr: PropTypes.array,
};
