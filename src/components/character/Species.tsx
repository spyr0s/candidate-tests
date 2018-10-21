import React from "react";
import { COLORS } from "../../styles";
import {
  TouchableOpacityProps} from "react-native";
import { Type, IconProps } from "./Type";

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
export class Species extends React.PureComponent<
  SpeciesProps & TouchableOpacityProps
> {
  render() {
    const props: IconProps = this.getProps();
    const type = this.props.type ? " (" + this.props.type + ")" : "";
    const value = this.props.species + type;
    return <Type value={value} {...this.props} typeProps={props} />;
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
