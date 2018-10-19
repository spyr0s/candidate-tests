import React from "react";
import { RickAndMorty } from "../../app/namespaces";
import { ListItem, Avatar } from "react-native-elements";
import { list } from "../../styles/styles";
import { Gender } from "./Gender";
import { View } from "react-native";
import { Status } from "./Status";
import Text from "../../components/Text";

export interface CharacterProps {
  character: RickAndMorty.Character;
  onPress?: () => void;
}
export default class CharacterItem extends React.PureComponent<CharacterProps> {
  render() {
    const character = this.props.character;
    const icons = [
      <Gender key="gender" gender={character.gender} />,
      <Status key="status" status={character.status} />
    ];
    return (
      <ListItem
        onPress={this.props.onPress}
        containerStyle={list.container}
        titleStyle={list.title}
        subtitleStyle={list.subtitle}
        leftAvatar={<Avatar source={{ uri: character.image }} rounded />}
        title={character.name}
        subtitle={<View style={{ flexDirection: "row" }}>{icons}</View>}
        chevron
      />
    );
  }
}
