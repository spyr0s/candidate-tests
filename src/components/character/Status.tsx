import React from "react";
import { COLORS } from "../../styles";
import { TouchableOpacityProps } from "react-native";
import { Type, IconProps } from "./Type";

export interface StatusProps {
  status: "Alive" | "Dead" | "unknown";
  showLabel?: boolean;
  onPress?: () => void;
  selected?: boolean;
}
export class Status extends React.PureComponent<
  StatusProps & TouchableOpacityProps
> {
  render() {
    const props: IconProps = this.getProps();
    return <Type value={this.props.status} {...this.props} typeProps={props} />;
  }

  getProps(): IconProps {
    switch (this.props.status) {
      case "Alive":
        return {
          name: "heart",
          color: COLORS.ERROR,
          type: "material-community"
        };
      case "Dead":
        return {
          name: "skull",
          color: COLORS.LIGHT,
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
