import React from "react";
import { COLORS } from "../../styles";
import {
  TouchableOpacityProps} from "react-native";
import { Type, IconProps } from "./Type";

export interface GenderProps {
  gender: "Female" | "Male" | "Genderless" | "unknown";
  showLabel?: boolean;
  onPress?: () => void;
  selected?: boolean;
}
export class Gender extends React.PureComponent<
  GenderProps & TouchableOpacityProps
> {
  render() {
    const props: IconProps = this.getProps();
    return <Type value={this.props.gender} {...this.props} typeProps={props} />;
  }

  getProps(): IconProps {
    switch (this.props.gender) {
      case "Female":
        return {
          name: "gender-female",
          color: COLORS.FEMALE,
          type: "material-community"
        };
      case "Male":
        return {
          name: "gender-male",
          color: COLORS.MALE,
          type: "material-community"
        };
      case "Genderless":
        return {
          name: "gender-male-female",
          color: COLORS.NEUTRAL,
          type: "material-community"
        };
      case "unknown":
        return {
          name: "help-circle",
          color: COLORS.TINT,
          type: "material-community"
        };

      default:
        break;
    }
  }
}
