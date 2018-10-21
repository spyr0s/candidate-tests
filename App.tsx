import React from "react";
import { Provider } from "react-redux";
import { StatusBar, NetInfo, ConnectionInfo, UIManager } from "react-native";
import COLORS from "./src/styles/colors";
import configureStore from "./src/app/store";
import AppWrapper from "./src/components/AppWrapper";
import { networkStatusChange } from "./src/redux/actions/app";
import Router from "./src/router/Router";
export const store = configureStore({});
export interface Props {}

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component<Props> {
  render() {
    function handleConnectivityChange(isConnected) {
      NetInfo.getConnectionInfo()
        .then((info: ConnectionInfo) => {
          store.dispatch(
            networkStatusChange({
              isConnected: isConnected,
              info: info
            })
          );
        })
        .catch(e => console.error(e));
    }

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleConnectivityChange
    );
    return (
      <Provider store={store}>
        <AppWrapper>
          <Router>
            <StatusBar
              barStyle="light-content"
              backgroundColor={COLORS.PRIMARY}
            />
          </Router>
        </AppWrapper>
      </Provider>
    );
  }
}
