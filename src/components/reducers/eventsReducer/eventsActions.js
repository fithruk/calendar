import {
  getAllEvents,
  addNewEvent,
  logout,
} from "../../../gateway/apiEndpoints";

const setLoadedEvents = (eventsArray) => {
  return {
    type: "SET_LOADED_EVENTS",
    payload: eventsArray,
  };
};

const setError = (error) => {
  return {
    type: "SET_ERRORS",
    payload: error,
  };
};

const loadEvents = () => {
  return async function (dispatch) {
    try {
      const data = await getAllEvents({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      if (data.events) {
        dispatch(setError({ msg: null }));
        dispatch(setLoadedEvents(data.events));
      } else {
        dispatch(setError(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const upLoadNewTask = async (newTask, token) => {
  try {
    const res = await addNewEvent(newTask, token);
    console.log(res);
  } catch (error) {
    throw new Error(error);
  }
};

const setMessages = (msg) => {
  return {
    type: "SET_MESSAGES",
    payload: msg,
  };
};

const leaveCurrentSession = async () => {
  const res = await logout(localStorage.getItem("token"));
  localStorage.removeItem("token");
  return res;
};

export {
  loadEvents,
  setLoadedEvents,
  upLoadNewTask,
  leaveCurrentSession,
  setMessages,
  setError,
};
