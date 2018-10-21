import React from "react";
import { Icon } from "react-native-elements";
import { COLORS, styles } from "../../styles";
import { SPACING, DISABLED_OPACITY } from "../../styles/styles";
import Text from "../../components/Text";
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet
} from "react-native";

export interface GenderProps {
  gender: "Female" | "Male" | "Genderless" | "unknown";
  showLabel?: boolean;
  onPress?: () => void;
  selected?: boolean;
}
interface IconProps {
  name: string;
  color: string;
}
export class Gender extends React.PureComponent<
  GenderProps & TouchableOpacityProps
> {
  render() {
    const props: IconProps = this.getProps();
    const selected = this.props.selected ? genderStyles.selected : null;
    return (
      <TouchableOpacity
        disabled={this.props.selected}
        onPress={() => {
          this.props.onPress;
        }}
        style={genderStyles.container}
        {...this.props}
      >
        <Icon
          underlayColor="transparent"
          iconStyle={[genderStyles.icon, selected]}
          type="material-community"
          name={props.name}
          color={props.color}
          containerStyle={{
            alignSelf: "flex-start",
            marginRight: SPACING.small
          }}
        />
        {this.props.showLabel && <Text>{this.props.gender}</Text>}
      </TouchableOpacity>
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
const genderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: SPACING.small
  },
  icon: {
    textAlign: "center",
    padding: 2,
    borderColor: COLORS.TRANSPARENT,
    borderWidth: 1,
  },
  selected: {
    borderColor: COLORS.DISCREET,
    borderWidth: 1,
    borderRadius: 20
  }
});
