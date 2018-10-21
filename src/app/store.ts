import rootReducer from "../redux/index";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger({
  duration: true,
  timestamp: false
});
// This connects the reducer to the store
export default function configureStore(initialState) {
  let store = null;
  if (__DEV__) {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, loggerMiddleware)
    );
  } else {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  }

  return store;
}
