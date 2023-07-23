const initialState = {
  eventsArr: [],
  error: {},
  messages: {},
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADED_EVENTS":
      return {
        ...state,
        eventsArr: (state.eventsArr = action.payload),
      };

    case "SET_ERRORS": {
      console.log(action.payload);
      return {
        ...state,
        error: (state.error = action.payload.payload),
      };
    }
    case "SET_MESSAGES": {
      return {
        ...state,
        messages: (state.messages = action.payload),
      };
    }
    default:
      return state;
  }
};

export { eventsReducer };
