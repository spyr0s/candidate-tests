import React from "react";
import {
  NavigationActions,
  NavigationScreenProp,
  StackActions,
  NavigationInjectedProps
} from "react-navigation";
import {
  ScrollView,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { COLORS } from "../../styles";
import { Icon } from "react-native-elements";
import { scale } from "../../styles/scaling";
import Text from "../../components/Text";
import { FONT_SIZE, SPACING } from "../../styles/styles";
import { Gender } from "../characters/Gender";
import { Status } from "../characters/Status";
import { Species } from "../characters/Species";
import HelpModal from "./HelpModal";
import { Query } from "../../services/Api";
import { setFilters, CharacterAction, resetFilters } from "../../redux/actions/characters";
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
    return (
      <ScrollView style={filterStyles.container}>
        <View style={filterStyles.headerContainer}>
          <Text style={filterStyles.header}>Filters</Text>
          <TouchableOpacity
            style={filterStyles.action}
            onPress={() => {
              this.props.resetFilters()
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
        <View style={filterStyles.filterContainer}>
          <Gender
            gender="Male"
            style={filterStyles.button}
            selected={filters.gender === "Male"}
          />
          <Gender
            gender="Female"
            style={filterStyles.button}
            selected={filters.gender === "Female"}
          />
          <Gender
            gender="Genderless"
            style={filterStyles.button}
            selected={filters.gender === "Genderless"}
          />
          <Gender
            gender="unknown"
            style={filterStyles.button}
            selected={filters.gender === "unknown"}
          />
        </View>
        <View style={filterStyles.labelContainer}>
          <Text style={filterStyles.labelName}>Status</Text>
        </View>
        <View style={filterStyles.filterContainer}>
          <Status
            status="Alive"
            style={filterStyles.button}
            selected={filters.status === "Alive"}
          />
          <Status
            status="Dead"
            style={filterStyles.button}
            selected={filters.status === "Dead"}
          />
          <Status
            status="unknown"
            style={filterStyles.button}
            selected={filters.status === "unknown"}
          />
        </View>
        <View style={filterStyles.labelContainer}>
          <Text style={filterStyles.labelName}>Species</Text>
        </View>
        <View style={filterStyles.filterContainer}>
          <Species
            species="Human"
            style={filterStyles.button}
            selected={filters.species === "Human"}
          />
          <Species
            species="Alien"
            style={filterStyles.button}
            selected={filters.species === "Alien"}
          />
          <Species
            species="Humanoid"
            style={filterStyles.button}
            selected={filters.species === "Humanoid"}
          />
          <Species
            species="Cronenberg"
            style={filterStyles.button}
            selected={filters.species === "Cronenberg"}
          />
        </View>
        <View style={filterStyles.filterContainer}>
          <Species
            species="Disease"
            style={filterStyles.button}
            selected={filters.species === "Disease"}
          />
          <Species
            species="Mytholog"
            style={filterStyles.button}
            selected={filters.species === "Mytholog"}
          />
          <Species
            species="Robot"
            style={filterStyles.button}
            selected={filters.species === "Robot"}
          />
          <Species
            species="Poopybutthole"
            style={filterStyles.button}
            selected={filters.species === "Poopybutthole"}
          />
        </View>
        <View style={filterStyles.filterContainer}>
          <Species
            species="Animal"
            style={filterStyles.button}
            selected={filters.species === "Animal"}
          />
          <Species
            species="Parasite"
            style={filterStyles.button}
            selected={filters.species === "Parasite"}
          />
          <Species
            species="Vampire"
            style={filterStyles.button}
            selected={filters.species === "Vampire"}
          />
          <Species
            species="unknown"
            style={filterStyles.button}
            selected={filters.species === "unknown"}
          />
        </View>
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
}

function mapDispatchToProps(dispatch) {
  return {
    setFilters: (filters: Query) => dispatch(setFilters(filters)),
    resetFilters: () => dispatch(resetFilters()),
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
    fontWeight:"600",
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
