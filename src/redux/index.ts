import { combineReducers } from "redux";
import { appReducer } from "./reducers/app";
import { charactersReducer } from "./reducers/characters";

const reducer = combineReducers({
  appReducer,
  charactersReducer
});
export default reducer;
