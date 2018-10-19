import React from "react";
import { TextProps, Text as RText } from "react-native";
import { text } from "../styles/styles";

export interface Props extends TextProps {}

interface State {}

export default class Text extends React.Component<Props, State> {
  render() {
    return (
      <RText {...this.props} style={[text.normal, this.props.style]}>
        {this.props.children}
      </RText>
    );
  }
}
