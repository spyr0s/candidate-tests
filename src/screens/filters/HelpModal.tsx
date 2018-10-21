import React, { ReactElement } from "react";
import { Icon } from "react-native-elements";

import { View, StyleSheet, Modal, ScrollView } from "react-native";
import { COLORS } from "../../styles";
import {
  SPACING,
  FONT_SIZE,
  LINE_HEIGHT,
  ICON_SIZE
} from "../../styles/styles";
import Text from "../../components/Text";
import { Gender } from "../../components/character/Gender";
import { filterStyles } from "./FiltersMenu";
import { Status } from "../../components/character/Status";
import { Species } from "../../components/character/Species";

export interface HelpModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}
export default class HelpModal extends React.Component<HelpModalProps> {

  render() {
    let gendersHelp: Array<ReactElement<Gender>> = [];
    let statusesHelp: Array<ReactElement<Status>> = [];
    let speciesHelp: Array<ReactElement<Species>> = [];
    ["Male", "Female", "Genderless", "unknown"].forEach(
      (gender: "Male" | "Female" | "Genderless" | "unknown") => {
        gendersHelp.push(
          <Gender
            key={gender}
            gender={gender}
            style={filterStyles.button}
            showLabel
          />
        );
      }
    );
    ["Alive", "Dead", "unknown"].forEach(
      (status: "Alive" | "Dead" | "unknown") => {
        statusesHelp.push(
          <Status
            key={status}
            status={status}
            style={filterStyles.button}
            showLabel
          />
        );
      }
    );
    [
      "Alien",
      "Animal",
      "Cronenberg",
      "Disease",
      "Human",
      "Humanoid",
      "Mytholog",
      "Parasite",
      "Poopybutthole",
      "Robot",
      "Vampire",
      "unknown"
    ].forEach(
      (
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
          | "unknown"
      ) => {
        speciesHelp.push(
          <Species
            key={species}
            species={species}
            style={filterStyles.button}
            showLabel
          />
        );
      }
    );
    return (
      <View>
        <Modal
          presentationStyle="formSheet"
          animationType="slide"
          visible={this.props.visible}
          onRequestClose={this.props.onClose}
          transparent={false}
        >
          <View style={helpModalStyles.mainContainer}>
            <View style={helpModalStyles.titleContainer}>
              <Text style={helpModalStyles.title}>{this.props.title}</Text>
              <Icon
                type="ionicon"
                name="md-close-circle"
                size={ICON_SIZE.normal}
                color={COLORS.TINT}
                underlayColor="transparent"
                onPress={() => {
                  this.props.onClose();
                }}
              />
            </View>
            <ScrollView>
              <View>
                <Text style={filterStyles.labelName}>Gender</Text>
                <View
                  style={[
                    filterStyles.filterContainer,
                    { flexDirection: "column" }
                  ]}
                >
                  {gendersHelp}
                </View>
              </View>
              <View>
                <Text style={filterStyles.labelName}>Status</Text>
                <View
                  style={[
                    filterStyles.filterContainer,
                    { flexDirection: "column" }
                  ]}
                >
                  {statusesHelp}
                </View>
              </View>
              <View>
                <Text style={filterStyles.labelName}>Species</Text>
                <View
                  style={[
                    filterStyles.filterContainer,
                    { flexDirection: "column" }
                  ]}
                >
                  {speciesHelp}
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const helpModalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  },
  titleContainer: {
    backgroundColor: COLORS.PRIMARY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.medium
  },
  title: {
    flex: 10,
    textAlign: "center",
    fontSize: FONT_SIZE.larger,
    lineHeight: LINE_HEIGHT.larger
  }
});
