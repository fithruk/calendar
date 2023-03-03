const initialState = {
  date: new Date(),
  dateFrom: new Date(),
  dateTo: new Date(new Date().setHours(new Date().getHours() + 1)),
  description: "",
  title: "",
  isOpen: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN_MODAL":
      return {
        ...state,
        isOpen: (state.isOpen = !state.isOpen),
      };
    case "UPDATE_MODAL_DATE_FROM":
      return {
        ...state,
        dateFrom: (state.dateFrom = new Date(action.payload)),
      };
    case "UPDATE_MODAL_DATE_TO":
      return {
        ...state,
        dateTo: (state.dateTo = action.payload),
      };
    case "UPDATE_MODAL_GENERAL_DATE":
      return {
        ...state,
        date: (state.date = action.payload.date),
        dateFrom: (state.date = action.payload.dateFrom),
        dateTo: (state.date = action.payload.dateTo),
      };
    case "UPDATE_MODAL_GENERAL_DATE_DINAMIC":
      return {
        ...state,
        date: (state.date = action.payload.date),
        dateFrom: (state.dateFrom = action.payload.date),
        dateTo: (state.dateTo = action.payload.dateTo),
      };
    case "UPDATE_MODAL_TITLE":
      return {
        ...state,
        title: (state.title = action.payload),
      };
    case "UPDATE_MODAL_DESCRIPTION":
      return {
        ...state,
        description: (state.description = action.payload),
      };
    default:
      return state;
  }
};

export { modalReducer };
