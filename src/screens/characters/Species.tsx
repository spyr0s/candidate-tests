import React from "react";
import { Icon } from "react-native-elements";
import { COLORS, styles } from "../../styles";
import { SPACING, text, DISABLED_OPACITY } from "../../styles/styles";
import Text from "../../components/Text";
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet
} from "react-native";

export interface SpeciesProps {
  species:
    | "Alien"
    | "Animal"
    | "Cronenberg"
    | "Disease"
    | "Human"
    | "Humanoid"
    | "Mytholog"
    | "Parasite"
    | "Poopybutthole"
    | "Robot"
    | "Vampire"
    | "unknown";
  type?: string;
  showLabel?: boolean;
  onPress?: () => void;
  selected?: boolean;
}
interface IconProps {
  name: string;
  color: string;
  type: string;
}
export class Species extends React.PureComponent<
  SpeciesProps & TouchableOpacityProps
> {
  render() {
    const props: IconProps = this.getProps();
    const type = this.props.type ? " (" + this.props.type + ")" : null;
    const selected = this.props.selected ? speciesStyles.selected : null;
    return (
      <TouchableOpacity
        disabled={this.props.selected}
        onPress={() => {
          this.props.onPress;
        }}
        style={speciesStyles.container}
        {...this.props}
      >
        <Icon
          underlayColor="transparent"
          iconStyle={[speciesStyles.icon, selected]}
          type={props.type}
          name={props.name}
          color={props.color}
          containerStyle={{
            alignSelf: "flex-start",
            marginRight: SPACING.small
          }}
        />
        {this.props.showLabel && (
          <View style={{ flexDirection: "row" }}>
            <Text>{this.props.species}</Text>
            <Text>{type}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  getProps(): IconProps {
    switch (this.props.species) {
      case "Alien":
        return {
          name: "alien",
          color: COLORS.DISCREET,
          type: "material-community"
        };
      case "Animal":
        return {
          name: "donkey",
          color: COLORS.LIGHT,
          type: "material-community"
        };
      case "Cronenberg":
        return {
          name: "optin-monster",
          color: COLORS.LIGHT,
          type: "font-awesome"
        };
      case "Disease":
        return {
          name: "bug",
          color: COLORS.LIGHT,
          type: "font-awesome"
        };
      case "Human":
        return {
          name: "human-male",
          color: COLORS.TINT,
          type: "material-community"
        };
      case "Humanoid":
        return {
          name: "human-child",
          color: COLORS.DISCREET,
          type: "material-community"
        };
      case "Mytholog":
        return {
          name: "sword-cross",
          color: COLORS.ERROR,
          type: "material-community"
        };
      case "Parasite":
        return {
          name: "bug",
          color: COLORS.SUCCESS,
          type: "material-community"
        };
      case "Poopybutthole":
        return {
          name: "circle",
          color: COLORS.DARK,
          type: "font-awesome"
        };
      case "Robot":
        return {
          name: "robot",
          color: COLORS.DISCREET,
          type: "material-community"
        };
      case "unknown":
        return {
          name: "help-circle",
          color: COLORS.TINT,
          type: "material-community"
        };
      case "Vampire":
        return {
          name: "tooth",
          color: COLORS.ERROR,
          type: "material-community"
        };

      default:
        break;
    }
  }
}
const speciesStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: SPACING.small
  },
  icon: {
    textAlign: "center",
    padding:2,
    borderColor: COLORS.TRANSPARENT,
    borderWidth:1,
  },
  selected: {
    borderColor: COLORS.DISCREET,
    borderWidth: 1,
    borderRadius: 20
  }
});
