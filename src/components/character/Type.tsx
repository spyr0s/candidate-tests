import React from "react";
import { Icon } from "react-native-elements";
import { COLORS } from "../../styles";
import { SPACING, LINE_HEIGHT } from "../../styles/styles";
import Text from "../Text";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet
} from "react-native";

export interface IconProps {
  name: string;
  color: string;
  type: string;
}

export interface TypeProps {
  value: string;
  typeProps: IconProps;
  showLabel?: boolean;
  onPress?: () => void;
  selected?: boolean;
}

export class Type extends React.PureComponent<
  TypeProps & TouchableOpacityProps
> {
  render() {
    const selected = this.props.selected ? typeStyles.selected : null;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress;
        }}
        style={typeStyles.container}
        {...this.props}
      >
        <Icon
          underlayColor="transparent"
          iconStyle={[typeStyles.icon, selected]}
          type={this.props.typeProps.type}
          name={this.props.typeProps.name}
          color={this.props.typeProps.color}
          containerStyle={typeStyles.iconContainer}
        />
        {this.props.showLabel && (
          <Text style={typeStyles.label}>{this.props.value}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const typeStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  },
  iconContainer: {
    alignSelf: "flex-start",
    marginRight: SPACING.small
  },
  icon: {
    textAlign: "center",
    padding: 2,
    borderColor: COLORS.TRANSPARENT,
    borderWidth: 1
  },
  selected: {
    borderColor: COLORS.DISCREET,
    borderWidth: 1,
    borderRadius: 20
  },
  label: {
    lineHeight: LINE_HEIGHT.normal
  }
});
