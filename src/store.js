import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  state: reducer,
});

const enhancers = applyMiddleware(thunk);

export const store = createStore(rootReducer, enhancers);
