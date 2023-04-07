import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { setFormatPropertyMinutes } from "../../utils/dateUtils";
import { loadEvents } from "../reducers/eventsReducer/eventsActions";
import { upLoadNewTask } from "../reducers/eventsReducer/eventsActions";
import { dataValidate } from "../../utils/formValidator";

import { useSelector, useDispatch } from "react-redux";
import "./modal.scss";

const Modal = () => {
  const { isOpen, date, dateFrom, dateTo, description, title } = useSelector(
    (state) => state.modalWindow
  );
  const token = localStorage.getItem("token");
  const { eventsArr } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateFrom") {
      dispatch({
        type: "UPDATE_MODAL_DATE_FROM",
        payload: new Date(
          `${moment(date).format("YYYY-MM-DD")} ${setFormatPropertyMinutes(
            name,
            value
          )}`
        ),
      });
    }
    if (name === "dateTo") {
      dispatch({
        type: "UPDATE_MODAL_DATE_TO",
        payload: new Date(
          `${moment(date).format("YYYY-MM-DD")} ${setFormatPropertyMinutes(
            name,
            value
          )}`
        ),
      });
    }
    if (name === "date") {
      dispatch({
        type: "UPDATE_MODAL_GENERAL_DATE",
        payload: {
          date: new Date(value),
          dateFrom: new Date(value),
          dateTo: new Date(value),
        },
      });
    }
    if (name === "title") {
      dispatch({
        type: "UPDATE_MODAL_TITLE",
        payload: value,
      });
    }
    if (name === "description") {
      dispatch({
        type: "UPDATE_MODAL_DESCRIPTION",
        payload: value,
      });
    }
  };

  const submitModal = async (e) => {
    e.preventDefault();
    const isntValid = dataValidate(dateFrom, dateTo, date, eventsArr);
    if (isntValid) {
      isntValid.forEach(({ msg }) => alert(msg));
      dispatch({ type: "TOGGLE_OPEN_MODAL" });

      return;
    }

    await upLoadNewTask({ date, dateFrom, dateTo, description, title }, token);
    dispatch({ type: "TOGGLE_OPEN_MODAL" });
    dispatch(loadEvents());
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={() => dispatch({ type: "TOGGLE_OPEN_MODAL" })}
          >
            +
          </button>
          <form className="event-form" onSubmit={submitModal}>
            <input
              required
              value={title}
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                required
                value={moment(date).format("YYYY-MM-DD")}
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleChange}
              />
              <input
                required
                value={moment(dateFrom).format("HH:mm")}
                type="time"
                name="dateFrom"
                className="event-form__field"
                onChange={handleChange}
              />
              <span>-</span>
              <input
                required
                value={moment(dateTo).format("HH:mm")}
                type="time"
                name="dateTo"
                className="event-form__field"
                onChange={handleChange}
              />
            </div>
            <textarea
              value={description}
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  setModalIsOpen: PropTypes.func,
  modalFormData: PropTypes.object,
  setModalFormData: PropTypes.func,
  eventsArr: PropTypes.array,
};
