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
      return {
        ...state,
        error: { ...state.error, msg: action.payload.payload },
      };
    }
    case "SET_MESSAGES": {
      return {
        ...state,
        messages: { ...state.messages, msg: action.payload.payload },
      };
    }
    default:
      return state;
  }
};

export { eventsReducer };
