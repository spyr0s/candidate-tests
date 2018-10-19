import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import COLORS from "./src/styles/colors";
import AppComponent from "./src/router/Router";
import configureStore from "./src/app/store";
export const store = configureStore({});
export interface Props {}

export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppComponent>
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.PRIMARY}
          />
        </AppComponent>
      </Provider>
    );
  }
}
