import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { setFormatPropertyMinutes } from "../../utils/dateUtils";
import { addNewEvent } from "../../gateway/apiEndpoints";
import { initialDateSettings } from "../../gateway/events";
import { dataValidate } from "../../utils/formValidator";

import { Context } from "../context/context";
import "./modal.scss";

const Modal = () => {
  const {
    modalIsOpenStore: { setModalIsOpen },
    modalFormStore: { modalFormData, setModalFormData },
    eventsStore: { eventsArr },
  } = useContext(Context);

  const { dateFrom, dateTo, description, title, id, date } = modalFormData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateFrom") {
      setModalFormData({
        ...modalFormData,
        dateFrom: new Date(
          `${moment(date).format("Y-M-D")} ${setFormatPropertyMinutes(
            name,
            value
          )}`
        ),
        date: new Date(
          `${moment(date).format("Y-M-D")} ${setFormatPropertyMinutes(
            name,
            value
          )}`
        ),
      });
    }
    if (name === "dateTo") {
      setModalFormData({
        ...modalFormData,
        dateTo: new Date(
          `${moment(date).format("Y-M-D")} ${setFormatPropertyMinutes(
            name,
            value
          )}`
        ),
      });
    }
    if (name === "date") {
      setModalFormData({
        ...modalFormData,
        date: new Date(value),
        dateFrom: new Date(value),
        dateTo: new Date(value),
      });
    }
    if (name === "title") {
      setModalFormData({
        ...modalFormData,
        title: value,
      });
    }
    if (name === "description") {
      setModalFormData({
        ...modalFormData,
        description: value,
      });
    }
  };

  const upLoadNewTask = async (newTask) => {
    try {
      await addNewEvent(newTask);
    } catch (error) {
      throw new Error(error);
    }
  };

  const submitModal = (e) => {
    e.preventDefault();
    const isntValid = dataValidate(dateFrom, dateTo, date, eventsArr);
    if (isntValid) {
      isntValid.forEach(({ msg }) => alert(msg));
      setModalIsOpen(false);
      setModalFormData(initialDateSettings);
      return;
    }

    upLoadNewTask(modalFormData);
    setModalIsOpen(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={() => setModalIsOpen(false)}
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
                value={moment(date).format("yyyy-MM-DD")}
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
