import React from "react";
import PropTypes from "prop-types";

import { days } from "../../utils/dateUtils.js";

import { useSelector } from "react-redux";

const Navigation = () => {
  const { weekDates, weekStartDate } = useSelector((state) => state.actualWeek);

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const passedTime =
          dayDate <= new Date() && dayDate.getDate() !== new Date().getDate()
            ? {
                opacity: "0.6",
              }
            : {};
        const currentDate =
          dayDate.getDate() === new Date().getDate() &&
          dayDate.getMonth() === new Date().getMonth()
            ? "day-label__day-number day-label__day-number_current-day"
            : "day-label__day-number";
        const currentDay =
          dayDate.getDate() === new Date().getDate() &&
          dayDate.getDay() === new Date().getDay()
            ? "day-label__day-name day-label__day-name_currert-name"
            : "day-label__day-name";
        return (
          <div
            className="calendar__day-label day-label"
            style={passedTime}
            key={dayDate.getTime()}
          >
            <span className={currentDay}>{days[dayDate.getDay()]}</span>
            <span className={currentDate}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;

Navigation.propTypes = {
  weekDates: PropTypes.array,
};
