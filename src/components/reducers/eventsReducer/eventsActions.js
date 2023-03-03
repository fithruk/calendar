import { getAllEvents } from "../../../gateway/apiEndpoints";

const setLoadedEvents = (eventsArray) => {
  return {
    type: "SET_LOADED_EVENTS",
    payload: eventsArray,
  };
};

const loadEvents = () => {
  return async function (dispatch) {
    try {
      const loadedEvents = await getAllEvents();
      dispatch(setLoadedEvents(loadedEvents));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export { loadEvents, setLoadedEvents };
