import { combineReducers } from "redux";
import countReducer from "../reducers/countReducer";

const rootReducer = combineReducers({
  count: countReducer
});

export default rootReducer;