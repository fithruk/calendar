import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { actualWeekReducer } from "./reducers/actualWeekReducer";
import { eventsReducer } from "./reducers/eventsReducer/eventsReducer";
import { modalReducer } from "./reducers/modalReducer/modalReducer";
import { spinnerReducer } from "./reducers/spinnerReducer/spinnerReducer";

const rootReducer = combineReducers({
  actualWeek: actualWeekReducer,
  events: eventsReducer,
  modalWindow: modalReducer,
  spinner: spinnerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
