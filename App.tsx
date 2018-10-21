import React from "react";
import { Provider } from "react-redux";
import { StatusBar, NetInfo, ConnectionInfo } from "react-native";
import COLORS from "./src/styles/colors";
import AppComponent from "./src/router/Router";
import configureStore from "./src/app/store";
import AppWrapper from "./src/components/AppWrapper";
import { networkStatusChange } from "./src/redux/actions/app";
export const store = configureStore({});
export interface Props {}

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
          <AppComponent>
            <StatusBar
              barStyle="light-content"
              backgroundColor={COLORS.PRIMARY}
            />
          </AppComponent>
        </AppWrapper>
      </Provider>
    );
  }
}
