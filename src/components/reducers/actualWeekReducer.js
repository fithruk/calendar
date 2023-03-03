import { generateWeekRange, getWeekStartDate } from "../../utils/dateUtils";

//const weekDates = generateWeekRange(getWeekStartDate(new Date()));

const initialState = {
  weekDates: generateWeekRange(getWeekStartDate(new Date())),
  weekStartDate: new Date(),
};

const actualWeekReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEW_WEEK":
      return {
        ...state,
        weekDates: generateWeekRange(getWeekStartDate(state.weekStartDate)),
      };
    case "SET_NEW_DATE":
      return {
        ...state,
        weekStartDate: (state.weekStartDate = action.payload),
      };

    default:
      return state;
  }
};

export { actualWeekReducer };
