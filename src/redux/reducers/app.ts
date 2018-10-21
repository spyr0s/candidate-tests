import { NETWORK_STATUS_CHANGE, AppAction } from "../actions/app";

export function appReducer(
  state = {
    isConnected: true,
    info:null,
  },
  action:AppAction
) {
  switch (action.type) {
    case NETWORK_STATUS_CHANGE:
      return {
        ...state,
        isConnected: action.status.isConnected,
        info: action.status.info,
      };
    default:
      return state;
  }
}
