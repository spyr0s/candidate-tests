import { ConnectionInfo } from "react-native";
import { Action } from "redux";

export const NETWORK_STATUS_CHANGE = "NETWORK_STATUS_CHANGE";

export interface AppAction extends Action {
  status: {
    isConnected: boolean;
    info: ConnectionInfo;
  };
}
export function networkStatusChange(status) {
  return {
    type: NETWORK_STATUS_CHANGE,
    status
  };
}
