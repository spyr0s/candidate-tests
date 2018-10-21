import React from "react";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { Query } from "../../services/Api";
import {
  CharacterAction,
  getCharacters,
  CharactersResult,
  setFilters,
  SET_CHARACTERS_FILTERS_SUCCESS
} from "../../redux/actions/characters";
import { RickAndMorty } from "../../app/namespaces";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  BackHandler,
  Alert,
  ToastAndroid
} from "react-native";
import CharacterItem from "./CharacterItem";
import { NavigationInjectedProps } from "react-navigation";
import { CharacterScreenParams } from "../character/Character";
import { SPACING, FONT_SIZE } from "../../styles/styles";
import { Icon } from "react-native-elements";
import { COLORS } from "../../styles";
import { AnyAction } from "redux";
import LoadingMore from "../../components/LoadingMore";
import { store } from "../../../App";
import { Gender } from "../../components/character/Gender";
import { Species } from "../../components/character/Species";
import { Status } from "../../components/character/Status";

interface State {
  loadingMore: boolean;
}
export interface CharactersScreenProps {
  loading: boolean;
  characters: CharactersResult;
  info: RickAndMorty.ResponseInfo;
  filters: Query;
  getCharacters: (filters: Query, append: boolean) => Promise<CharacterAction>;
  setFilters: (filters: Query) => Promise<CharacterAction>;
}
class CharactersScreen extends React.Component<
  CharactersScreenProps & NavigationInjectedProps,
  State
> {
  exit: boolean = false;
  constructor(props) {
    super(props);
    this.state = {
      loadingMore: false
    };
  }

  componentDidMount() {
    this.getCharacters(false);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    const isFocused = this.props.navigation.isFocused();
    if (!isFocused) {
      this.props.navigation.goBack(null);
      return true;
    }
    if (this.exit === true) {
      return false;
    }
    this.exit = true;
    ToastAndroid.show("Press back again to exit", 3000);
    setTimeout(() => {
      this.exit = false;
    }, 3000);
    return true;
  };

  componentWillUpdate(
    nextProps: CharactersScreenProps & NavigationInjectedProps
  ) {
    if (this.props !== nextProps) {
      if (this.props.characters.result !== nextProps.characters.result) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    }
  }

  getCharacters(append: boolean, page: number = 1): Promise<AnyAction> {
    const filters = this.props.filters;
    filters["page"] = page;
    return this.props.getCharacters(filters, append);
  }

  render() {
    const hasMore =
      this.props.info && this.props.info.pages > this.props.filters.page;
    return (
      <Container>
        {this.props.info && (
          <View style={charactersScreenStyles.topContainer}>
            <Text style={charactersScreenStyles.resultText}>
              {this.props.info.count} results ({this.props.filters.page} of{" "}
              {this.props.info.pages} pages)
            </Text>
            <View style={charactersScreenStyles.filtersContainer}>
              {this.props.filters.species && (
                <Species
                  species={this.props.filters.species}
                  onPress={() => {
                    this.setFilter("species", this.props.filters.species);
                  }}
                />
              )}
              {this.props.filters.gender && (
                <Gender
                  gender={this.props.filters.gender}
                  onPress={() => {
                    this.setFilter("gender", this.props.filters.gender);
                  }}
                />
              )}
              {this.props.filters.status && (
                <Status
                  status={this.props.filters.status}
                  onPress={() => {
                    this.setFilter("status", this.props.filters.status);
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}
              >
                <Icon
                  name="filter"
                  type="material-community"
                  color={COLORS.TINT}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <FlatList
          data={this.props.characters.result}
          keyExtractor={(item: number) => item.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={
            <Text style={charactersScreenStyles.emptyResults}>
              No results found
            </Text>
          }
          onEndReached={() => {
            this.setState({ loadingMore: true }, () => {
              if (hasMore) {
                const page = parseInt(this.props.filters.page.toString()) + 1;
                this.getCharacters(true, page).then(() => {
                  this.setState({ loadingMore: false });
                });
              }
            });
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            hasMore ? (
              <LoadingMore visible={this.state.loadingMore} text="Loading..." />
            ) : null
          }
        />
        <Loader visible={this.props.loading && !this.state.loadingMore} />
      </Container>
    );
  }

  renderItem: any = ({ item }) => {
    const character: RickAndMorty.Character = this.props.characters.entities
      .characters[item];

    return (
      <CharacterItem
        character={character}
        onIconPress={(type: string, value: string) => {
          this.setFilter(type, value);
        }}
        onPress={() => {
          const params: CharacterScreenParams = { character };
          this.props.navigation.navigate("character", params);
        }}
      />
    );
  };

  setFilter(type: string, value: string) {
    let filters = this.props.filters;
    if (filters[type] === value) {
      filters[type] = null;
    } else {
      filters[type] = value;
    }
    filters["page"] = 1;
    this.changeFilters(filters);
  }

  changeFilters(filters) {
    this.props
      .setFilters(filters)
      .then((action: CharacterAction) => {
        if (action.type === SET_CHARACTERS_FILTERS_SUCCESS) {
          store.dispatch(getCharacters(filters, false));
        }
      })
      .catch(e => console.error(e));
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCharacters: (filters: Query, append: boolean) =>
      dispatch(getCharacters(filters, append)),
    setFilters: (filters: Query) => dispatch(setFilters(filters))
  };
}

function mapStateToProps(state) {
  return {
    characters: state.charactersReducer.characters,
    info: state.charactersReducer.info,
    filters: state.charactersReducer.filters,
    loading: state.charactersReducer.loading
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersScreen);

const charactersScreenStyles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.medium,
    borderBottomColor: COLORS.TINT,
    borderBottomWidth: 1
  },
  emptyResults: {
    fontSize: FONT_SIZE.large,
    fontWeight: "600",
    textAlign: "center",
    padding: SPACING.large
  },
  resultText: {},
  filtersContainer: {
    flexDirection: "row"
  }
});
