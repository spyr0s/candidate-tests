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
import { FlatList } from "react-native";
import CharacterItem from "./CharacterItem";
import { NavigationInjectedProps } from "react-navigation";
import { CharacterScreenParams } from "../character/Character";

interface State {}
export interface CharactersScreenProps {
  loading: boolean;
  characters: CharactersResult;
  getCharacters: (filters?: Query) => Promise<CharacterAction>;
}
class CharactersScreen extends React.Component<
  CharactersScreenProps & NavigationInjectedProps,
  State
> {
  componentDidMount() {
    this.props.getCharacters();
  }
  render() {
    return (
      <Container>
        <FlatList
          data={this.props.characters.result}
          keyExtractor={(item: number, index: number) => item.toString()}
          renderItem={this.renderItem}
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
    getCharacters: (filter: Query) => dispatch(getCharacters(filter))
  };
}

function mapStateToProps(state) {
  return {
    characters: state.charactersReducer.characters,
    loading: state.charactersReducer.loading
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersScreen);
