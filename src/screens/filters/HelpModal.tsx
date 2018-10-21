import React from "react";
import { Icon } from "react-native-elements";

import {
  View,
  StyleSheet,
  BackHandler,
  Modal,
  ScrollView
} from "react-native";
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
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.onClose();
    return true;
  };

  render() {
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
                  <Gender gender="Male" style={filterStyles.button} showLabel />
                  <Gender
                    gender="Female"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Gender
                    gender="Genderless"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Gender
                    gender="unknown"
                    style={filterStyles.button}
                    showLabel
                  />
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
                  <Status
                    status="Alive"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Status status="Dead" style={filterStyles.button} showLabel />
                  <Status
                    status="unknown"
                    style={filterStyles.button}
                    showLabel
                  />
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
                  <Species
                    species="Human"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Alien"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Humanoid"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Cronenberg"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Disease"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Mytholog"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Robot"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Poopybutthole"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Animal"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Parasite"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="Vampire"
                    style={filterStyles.button}
                    showLabel
                  />
                  <Species
                    species="unknown"
                    style={filterStyles.button}
                    showLabel
                  />
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
