const initialState = {
  eventsArr: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADED_EVENTS":
      return {
        ...state,
        eventsArr: (state.eventsArr = action.payload),
      };
    default:
      return state;
  }
};

export { eventsReducer };
