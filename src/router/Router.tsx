import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { COLORS } from "../styles";
import { MainStack } from "./MainStack";

const SwitchStack = createSwitchNavigator(
  {
    mainStack: MainStack
  },
  {
    initialRouteName: "mainStack"
  }
);

export default class Router extends React.Component {
  render() {
    return <SwitchStack style={{ backgroundColor: COLORS.DARK }} />;
  }
}
