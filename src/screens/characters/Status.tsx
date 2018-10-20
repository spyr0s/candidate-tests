import React from "react";
import { Icon } from "react-native-elements";
import { COLORS, styles } from "../../styles";
import { SPACING, DISABLED_OPACITY } from "../../styles/styles";
import {
  View,
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Text from "../../components/Text";

export interface StatusProps {
  status: "Alive" | "Dead" | "unknown";
  showLabel?: boolean;
  selected?: boolean;
}
interface IconProps {
  name: string;
  color: string;
}
export class Status extends React.PureComponent<
  StatusProps & TouchableOpacityProps
> {
  render() {
    const props: IconProps = this.getProps();
    const selected = this.props.selected ? statusStyles.selected : null;
    return (
      <TouchableOpacity
        disabled={this.props.selected}
        onPress={() => {
          this.props.onPress;
        }}
        style={statusStyles.container}
        {...this.props}
      >
        <Icon
          underlayColor="transparent"
          iconStyle={[statusStyles.icon, selected]}
          type="material-community"
          name={props.name}
          color={props.color}
          containerStyle={{
            alignSelf: "flex-start",
            marginRight: SPACING.small
          }}
        />
        {this.props.showLabel && <Text>{this.props.status}</Text>}
      </TouchableOpacity>
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

const statusStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: SPACING.small
  },
  icon: {
    textAlign: "center",
    padding:2,
  },
  selected: {
    borderColor: COLORS.DISCREET,
    borderWidth: 1,
    borderRadius: 20
  }
});
