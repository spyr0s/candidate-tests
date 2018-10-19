import React from "react";
import { View, StatusBar } from "react-native";
import { COLORS } from "../styles";
import { container } from "../styles/styles";

export interface Props {
  style?: any;
  hideBanner?: boolean;
}
interface State {}
export default class Container extends React.Component<Props, State> {
  render() {
    return (
      <View style={[container.default, this.props.style]}>
        <StatusBar backgroundColor={COLORS.PRIMARY} barStyle="light-content" />
        <View style={{ flex: 1 }}>{this.props.children}</View>
      </View>
    );
  }
}
