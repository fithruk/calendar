import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { actualWeekReducer } from "./reducers/actualWeekReducer";
import { eventsReducer } from "./reducers/eventsReducer/eventsReducer";
import { modalReducer } from "./reducers/modalReducer/modalReducer";

const rootReducer = combineReducers({
  actualWeek: actualWeekReducer,
  events: eventsReducer,
  modalWindow: modalReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
