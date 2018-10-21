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
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import CharacterItem from "./CharacterItem";
import { NavigationInjectedProps } from "react-navigation";
import { CharacterScreenParams } from "../character/Character";
import { SPACING, FONT_SIZE } from "../../styles/styles";
import { Icon } from "react-native-elements";
import { COLORS } from "../../styles";
import { AnyAction } from "redux";
import LoadingMore from "../../components/LoadingMore";
import { store } from "../../../App";

interface State {
  page: number;
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
  species = [];
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loadingMore: false
    };
  }

  componentDidMount() {
    this.getCharacters(false);
  }

  getCharacters(append: boolean): Promise<AnyAction> {
    const filters = this.props.filters;
    filters["page"] = this.state.page;
    return this.props.getCharacters(filters, append);
  }

  render() {
    const hasMore = this.props.info && this.props.info.pages > this.state.page;
    const filtersColor = !this.hasFilters() ? COLORS.TINT : COLORS.SUCCESS;
    return (
      <Container>
        {this.props.info && (
          <View style={charactersScreenStyles.topContainer}>
            <Text>
              {this.props.info.count} results ({this.props.filters.page} of{" "}
              {this.props.info.pages} pages)
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            >
              <Icon
                name="filter"
                type="material-community"
                color={filtersColor}
              />
            </TouchableOpacity>
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
            this.setState(
              { loadingMore: true, page: this.state.page + 1 },
              () => {
                if (hasMore) {
                  this.getCharacters(true).then(() => {
                    this.setState({ loadingMore: false });
                  });
                }
              }
            );
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

  hasFilters(): boolean {
    const hasFilters =
      this.props.filters.gender !== null ||
      this.props.filters.status !== null ||
      this.props.filters.species !== null;
    return hasFilters;
  }

  renderItem: any = ({ item }) => {
    const character: RickAndMorty.Character = this.props.characters.entities
      .characters[item];
    this.species.push(character.species);
    return (
      <CharacterItem
        character={character}
        onIconPress={(type: string, value: string) => {
          let filters = this.props.filters;
          if (filters[type] === value) {
            filters[type] = null;
          } else {
            filters[type] = value;
          }
          filters["page"] = 1;
          this.changeFilters(filters);
        }}
        onPress={() => {
          const params: CharacterScreenParams = { character };
          this.props.navigation.navigate("character", params);
        }}
      />
    );
  };

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
  }
});
