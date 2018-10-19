import React from "react";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { Query } from "../../services/Api";
import {
  CharacterAction,
  getCharacters,
  CharactersResult
} from "../../redux/actions/characters";
import { RickAndMorty } from "../../app/namespaces";
import { connect } from "react-redux";
import Loader from "../../app/Loader";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import CharacterItem from "./CharacterItem";
import { NavigationInjectedProps } from "react-navigation";
import { CharacterScreenParams } from "../character/Character";
import { SPACING } from "../../styles/styles";
import { Icon } from "react-native-elements";
import { COLORS } from "../../styles";
import { AnyAction } from "redux";
import LoadingMore from "../../components/LoadingMore";

interface State {
  page: number;
  filters: { [key: string]: string };
  loadingMore: boolean;
}
export interface CharactersScreenProps {
  loading: boolean;
  characters: CharactersResult;
  info: RickAndMorty.ResponseInfo;
  getCharacters: (
    filters: Query,
    page: number,
    append: boolean
  ) => Promise<CharacterAction>;
}
class CharactersScreen extends React.Component<
  CharactersScreenProps & NavigationInjectedProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      filters: {},
      loadingMore: false
    };
  }
  componentDidMount() {
    this.getCharacters(false);
  }

  getCharacters(append: boolean): Promise<AnyAction> {
    return this.props.getCharacters(
      this.state.filters,
      this.state.page,
      append
    );
  }

  render() {
    const hasMore = this.props.info && this.props.info.pages > this.state.page;
    return (
      <Container>
        {this.props.info && (
          <View style={charactersScreenStyles.topContainer}>
            <Text>{this.props.info.count} results</Text>
            <TouchableOpacity>
              <Icon
                name="filter"
                type="material-community"
                color={COLORS.TINT}
              />
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={this.props.characters.result}
          keyExtractor={(item: number, index: number) => item.toString()}
          renderItem={this.renderItem}
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
        <Loader visible={this.props.loading} />
      </Container>
    );
  }

  renderItem: any = ({ item }) => {
    const character: RickAndMorty.Character = this.props.characters.entities
      .characters[item];
    return (
      <CharacterItem
        character={character}
        onPress={() => {
          const params: CharacterScreenParams = { character };
          this.props.navigation.navigate("character", params);
        }}
      />
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCharacters: (filter: Query, page: number, append: boolean) =>
      dispatch(getCharacters(filter, page, append))
  };
}

function mapStateToProps(state) {
  return {
    characters: state.charactersReducer.characters,
    info: state.charactersReducer.info,
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
  }
});
