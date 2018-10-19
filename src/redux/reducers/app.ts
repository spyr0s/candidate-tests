import { AppAction } from "../actions/app";

export function appReducer(
  state = {
    loading: false
  },
  action: AppAction
) {
  switch (action.type) {
    default:
      return state;
  }
}
