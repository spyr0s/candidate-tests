import React from "react";
import { View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { RickAndMorty } from "../../app/namespaces";
import { list } from "../../styles/styles";
import { Gender } from "../../components/character/Gender";
import { Species } from "../../components/character/Species";
import { Status } from "../../components/character/Status";

export interface CharacterProps {
  character: RickAndMorty.Character;
  onPress?: () => void;
  onIconPress?: (type: string, value: string) => void;
}
export default class CharacterItem extends React.PureComponent<CharacterProps> {
  render() {
    const character = this.props.character;
    const icons = [
      <Species
        key="species"
        species={character.species}
        onPress={() => {
          this.props.onIconPress("species", character.species);
        }}
      />,
      <Gender
        key="gender"
        gender={character.gender}
        onPress={() => {
          this.props.onIconPress("gender", character.gender);
        }}
      />,
      <Status
        key="status"
        status={character.status}
        onPress={() => {
          this.props.onIconPress("status", character.status);
        }}
      />
    ];
    return (
      <ListItem
        onPress={this.props.onPress}
        containerStyle={list.container}
        titleStyle={list.title}
        subtitleStyle={list.subtitle}
        leftAvatar={
          <Avatar size="medium" source={{ uri: character.image }} rounded />
        }
        title={character.name}
        subtitle={<View style={{ flexDirection: "row" }}>{icons}</View>}
        chevron
      />
    );
  }
}
