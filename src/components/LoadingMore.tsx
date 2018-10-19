import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../styles";
import Text from "./Text";
import { FONT_SIZE, SPACING } from "../styles/styles";

export interface Props {
  visible: boolean;
  text?: string;
}

interface State {}

export default class LoadingMore extends React.Component<Props, State> {
  render() {
    const visible = this.props.visible;
    return (
      <View style={loaderStyles.container}>
        {this.props.visible && (
          <ActivityIndicator size="large" color={COLORS.TINT} />
        )}
        {this.props.visible &&
          this.props.text && (
            <Text style={loaderStyles.text}>{this.props.text}</Text>
          )}
      </View>
    );
  }
}

const loaderStyles = StyleSheet.create({
  container: {
    margin: SPACING.medium
  },
  text: {
    fontSize: FONT_SIZE.normal,
    textAlign: "center"
  }
});
