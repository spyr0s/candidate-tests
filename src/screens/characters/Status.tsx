import React from "react";
import { Icon } from "react-native-elements";
import { COLORS } from "../../styles";
import { SPACING } from "../../styles/styles";
import { View } from "react-native";
import Text from "../../components/Text";

export interface StatusProps {
  status: "Alive" | "Dead" | "unknown";
  showLabel?: boolean;
}
interface IconProps {
  name: string;
  color: string;
}
export class Status extends React.PureComponent<StatusProps> {
  render() {
    const props: IconProps = this.getProps();
    return (
      <View style={{ flexDirection: "row" }}>
        <Icon
          type="material-community"
          name={props.name}
          color={props.color}
          containerStyle={{
            alignSelf: "flex-start",
            marginRight: SPACING.small
          }}
        />
        {this.props.showLabel && <Text>{this.props.status}</Text>}
      </View>
    );
  }

  getProps(): IconProps {
    switch (this.props.status) {
      case "Alive":
        return {
          name: "heart",
          color: COLORS.ERROR
        };
      case "Dead":
        return {
          name: "skull",
          color: COLORS.LIGHT
        };
      case "unknown":
        return {
          name: "help-circle",
          color: COLORS.TINT
        };

      default:
        break;
    }
  }
}
