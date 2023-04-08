const initialState = {
  displaySpinner: false,
};

const spinnerReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "TOGGLE_SPINNER":
      return {
        ...state,
        displaySpinner: (state.displaySpinner = !state.displaySpinner),
      };
    default:
      return state;
  }
};

export { spinnerReducer };
