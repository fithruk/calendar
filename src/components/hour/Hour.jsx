import React from "react";
import PropTypes from "prop-types";

import Event from "../event/Event";
import RedLine from "../redLine/RedLine";

import { useDispatch } from "react-redux";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ dataDay, dataHour, hourEvents, month }) => {
  const dispatch = useDispatch();
  const setPropertyYear = (month) => {
    if (
      new Date(month).getMonth(month) === 0 &&
      new Date().getFullYear() !== new Date().getFullYear()
    ) {
      return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    } else {
      return new Date();
    }
  };

  const setDinamicEvent = (e) => {
    dispatch({ type: "TOGGLE_OPEN_MODAL" });

    const date = new Date(
      setPropertyYear(e.target.dataset.month).getFullYear(),
      e.target.dataset.month,
      e.target.parentNode.dataset.day,
      e.target.dataset.time
    );

    dispatch({
      type: "UPDATE_MODAL_GENERAL_DATE_DINAMIC",
      payload: {
        date,
        dateFrom: date,
        dateTo: new Date(
          new Date(date).setHours(new Date(date).getHours() + 1)
        ),
      },
    });
  };

  const renderRedLine = (dataHour) => {
    return dataDay.getDate() === new Date().getDate() &&
      new Date().getHours() === dataHour ? (
      <RedLine />
    ) : null;
  };

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour}
      data-month={month}
      onClick={setDinamicEvent}
    >
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <Event
            id={id}
            key={id}
            //calculating event height = duration of event in minutes
            height={
              (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
              (1000 * 60)
            }
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
          />
        );
      })}
      {renderRedLine(dataHour)}
    </div>
  );
};

export default Hour;

Hour.propTypes = {
  setModalIsOpen: PropTypes.func,
  modalFormData: PropTypes.object,
  setModalFormData: PropTypes.func,
};
