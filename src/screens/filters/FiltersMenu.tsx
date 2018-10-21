import React, { ReactElement } from "react";
import { NavigationInjectedProps } from "react-navigation";
import { ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { COLORS } from "../../styles";
import { Icon } from "react-native-elements";
import Text from "../../components/Text";
import { FONT_SIZE, SPACING } from "../../styles/styles";
import { Gender } from "../../components/character/Gender";
import { Status } from "../../components/character/Status";
import { Species } from "../../components/character/Species";
import HelpModal from "./HelpModal";
import { Query } from "../../services/Api";
import {
  setFilters,
  CharacterAction,
  resetFilters,
  SET_CHARACTERS_FILTERS_SUCCESS,
  getCharacters,
  RESET_CHARACTERS_FILTERS_SUCCESS
} from "../../redux/actions/characters";
import { store } from "../../../App";
export interface Props {
  filters: Query;
  setFilters: (filters: Query) => Promise<CharacterAction>;
  resetFilters: () => Promise<CharacterAction>;
}

interface State {
  showHelpModal: boolean;
}

class FiltersMenu extends React.Component<
  Props & NavigationInjectedProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      showHelpModal: false
    };
  }
  render() {
    const filters = this.props.filters;
    let genderFilters: Array<ReactElement<Gender>> = [];
    let statusFilters: Array<ReactElement<Status>> = [];
    let speciesFilters: Array<ReactElement<Species>> = [];
    ["Male", "Female", "Genderless", "unknown"].forEach(
      (gender: "Male" | "Female" | "Genderless" | "unknown") => {
        genderFilters.push(
          <Gender
            key={gender}
            gender={gender}
            style={filterStyles.button}
            selected={filters.gender === gender}
            onPress={() => {
              this.setFilters("gender", gender);
            }}
          />
        );
      }
    );
    ["Alive", "Dead", "unknown"].forEach(
      (status: "Alive" | "Dead" | "unknown") => {
        statusFilters.push(
          <Status
            key={status}
            status={status}
            style={filterStyles.button}
            selected={filters.status === status}
            onPress={() => {
              this.setFilters("status", status);
            }}
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
        speciesFilters.push(
          <Species
            key={species}
            species={species}
            style={filterStyles.button}
            selected={filters.species === species}
            onPress={() => {
              this.setFilters("species", species);
            }}
          />
        );
      }
    );
    return (
      <ScrollView style={filterStyles.container}>
        <View style={filterStyles.headerContainer}>
          <Text style={filterStyles.header}>Filters</Text>
          <TouchableOpacity
            style={filterStyles.action}
            onPress={() => {
              this.resetFilters();
            }}
          >
            <Icon type="font-awesome" name="remove" color={COLORS.ERROR} />
          </TouchableOpacity>
          <TouchableOpacity
            style={filterStyles.action}
            onPress={() => {
              this.setState({ showHelpModal: true });
            }}
          >
            <Icon type="entypo" name="help" color={COLORS.LIGHT} />
          </TouchableOpacity>
        </View>
        <View style={filterStyles.labelContainer}>
          <Text style={filterStyles.labelName}>Gender</Text>
        </View>
        <View style={filterStyles.filterContainer}>{genderFilters}</View>
        <View style={filterStyles.labelContainer}>
          <Text style={filterStyles.labelName}>Status</Text>
        </View>
        <View style={filterStyles.filterContainer}>{statusFilters}</View>
        <View style={filterStyles.labelContainer}>
          <Text style={filterStyles.labelName}>Species</Text>
        </View>
        <View style={filterStyles.filterContainer}>{speciesFilters}</View>
        <HelpModal
          key="help"
          onClose={() => {
            this.setState({ showHelpModal: false });
          }}
          title="Filters Help"
          visible={this.state.showHelpModal}
        />
      </ScrollView>
    );
  }

  resetFilters() {
    this.props
      .resetFilters()
      .then((action: CharacterAction) => {
        if (action.type === RESET_CHARACTERS_FILTERS_SUCCESS) {
          this.props.navigation.closeDrawer();
          const filters = action.filters;
          store.dispatch(getCharacters(filters, false));
        }
      })
      .catch(e => console.error(e));
  }

  setFilters(type, value) {
    let filters = this.props.filters;
    if (filters[type] === value) {
      filters[type] = null;
    } else {
      filters[type] = value;
    }
    filters["page"] = 1;
    this.props
      .setFilters(filters)
      .then((action: CharacterAction) => {
        if (action.type === SET_CHARACTERS_FILTERS_SUCCESS) {
          this.props.navigation.closeDrawer();
          const filters = action.filters;
          store.dispatch(getCharacters(filters, false));
        }
      })
      .catch(e => console.error(e));
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFilters: (filters: Query) => dispatch(setFilters(filters)),
    resetFilters: () => dispatch(resetFilters())
  };
}

function mapStateToProps(state) {
  return {
    filters: state.charactersReducer.filters
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersMenu);

export const filterStyles = StyleSheet.create({
  container: {
    paddingTop: SPACING.large,
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.TINT
  },
  headerContainer: {
    flexDirection: "row",
    padding: SPACING.small,
    borderBottomColor: COLORS.DISCREET,
    borderBottomWidth: 1
  },
  header: {
    flex: 0.8,
    textAlign: "center",
    fontSize: FONT_SIZE.larger,
    fontWeight: "600",
    color: COLORS.TINT
  },
  action: {
    flex: 0.1,
    marginHorizontal: SPACING.medium
  },
  labelContainer: {
    paddingVertical: SPACING.medium
  },
  labelName: {
    textAlign: "center",
    paddingHorizontal: SPACING.medium,
    fontSize: FONT_SIZE.large,
    fontWeight: "600"
  },
  filterContainer: {
    paddingBottom: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },

  button: {
    margin: SPACING.small,
    flexDirection: "row"
  }
});
