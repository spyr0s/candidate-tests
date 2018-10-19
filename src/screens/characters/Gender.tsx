import React from "react";
import { Icon } from "react-native-elements";
import { COLORS } from "../../styles";
import { SPACING } from "../../styles/styles";
import Text from "../../components/Text";
import { View } from "react-native";

export interface GenderProps {
  gender: "Female" | "Male" | "Genderless" | "unknown";
  showLabel?: boolean;
}
interface IconProps {
  name: string;
  color: string;
}
export class Gender extends React.PureComponent<GenderProps> {
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
        {this.props.showLabel && <Text>{this.props.gender}</Text>}
      </View>
    );
  }

  getProps(): IconProps {
    switch (this.props.gender) {
      case "Female":
        return {
          name: "gender-female",
          color: COLORS.FEMALE
        };
      case "Male":
        return {
          name: "gender-male",
          color: COLORS.MALE
        };
      case "Genderless":
        return {
          name: "gender-male-female",
          color: COLORS.NEUTRAL
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
