import React from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../styles";
import { FONT_SIZE } from "../styles/styles";
import Text from "./Text";

export interface LoaderProps {
  visible: boolean;
  text?: string;
}

interface State {
  visible: boolean;
}
const LOADER_DELAY = 300;

export default class Loader extends React.Component<LoaderProps, State> {
  timerId = null;
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillReceiveProps(nextProps: LoaderProps) {
    console.log("PROPS COMING", this.props, nextProps);
    if (this.props !== nextProps) {
      if (this.props.visible !== nextProps.visible) {
        if (nextProps.visible === false) {
          console.log("HIDE PROP COMING");
          this.setState({ visible: nextProps.visible });
          if (this.timerId !== null) {
            console.log("TIMED OUT");
            clearTimeout(this.timerId);
            this.timerId = null;
          }
        } else {
          console.log("SHOW PROP COMING");
          this.timerId = setTimeout(() => {
            console.log("TIME OUT PASSED - SHOWING");
            this.setState({ visible: nextProps.visible });
          }, LOADER_DELAY);
        }
      }
    }
  }

  render() {
    return this.state.visible ? (
      <View style={loader.loader}>
        <ActivityIndicator size="large" color={COLORS.TINT} />
        {this.props.text && <Text style={loader.text}>{this.props.text}</Text>}
      </View>
    ) : null;
  }
}

const loader = StyleSheet.create({
  loader: {
    opacity: 0.9,
    backgroundColor: COLORS.OVERLAY,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: FONT_SIZE.normal,
    textAlign: "center"
  }
});
