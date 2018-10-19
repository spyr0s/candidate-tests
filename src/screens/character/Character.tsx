import React, { Component } from "react";
import { RickAndMorty } from "../../app/namespaces";
import Container from "../../components/Container";
import { NavigationInjectedProps } from "react-navigation";
import Text from "../../components/Text";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { list } from "../../styles/styles";
import { Gender } from "../characters/Gender";
import { Status } from "../characters/Status";
import { scale } from "../../styles/scaling";
import { COLORS } from "../../styles";
import moment from "moment";
export interface CharacterScreenParams {
  character: RickAndMorty.Character;
}
export interface CharacterScreenProps {}
export default class CharacterScreen extends React.Component<
  CharacterScreenProps & NavigationInjectedProps
> {
  animatedHeaderValue: Animated.Value;

  constructor(props) {
    super(props);
    this.animatedHeaderValue = new Animated.Value(0);
  }

  static navigationOptions = ({ navigation }) => {
    const character: RickAndMorty.Character = navigation.getParam("character");
    return {
      title: character.name
    };
  };
  render() {
    const character: RickAndMorty.Character = this.props.navigation.getParam(
      "character"
    );

    const width = Dimensions.get("window").width;
    const height = width;
    const HEADER_MAX_HEIGHT = height;
    const HEADER_MIN_HEIGHT = scale(65);
    const AnimatedHeaderOpacity = this.animatedHeaderValue.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
      ],
      outputRange: [1, 0.7, 1],
      extrapolate: "clamp"
    });
    const AnimatedAltHeaderOpacity = this.animatedHeaderValue.interpolate({
      inputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    const AnimateHeaderHeight = this.animatedHeaderValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    return (
      <Container>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.animatedHeaderValue } }
            }
          ])}
          style={{ flex: 1 }}
        >
          <Row label="Name" value={character.name} />
          <Row label="Episodes" value={character.episode.length.toString()} />
          <Row
            label="Gender"
            value={<Gender gender={character.gender} showLabel />}
          />
          <Row label="Location" value={character.location.name} />
          <Row label="Origin" value={character.origin.name} />
          <Row label="Species" value={character.species} />
          <Row
            label="Status"
            value={<Status status={character.status} showLabel />}
          />
          <Row label="Type" value={character.type} />
          <Row
            label="Created"
            value={moment(character.created).format( "DD/MM/YYYY")}
          />
        </ScrollView>
        <Animated.View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: AnimateHeaderHeight,
              opacity: AnimatedHeaderOpacity,
              backgroundColor: COLORS.DARK
            }
          ]}
        >
          <Image
            style={{ width, height, backgroundColor: COLORS.DARK }}
            source={{ uri: character.image }}
          />
        </Animated.View>
      </Container>
    );
  }
}

interface RowProps {
  label: string;
  value: string | React.ReactElement<{}>;
}
class Row extends React.Component<RowProps> {
  render() {
    return (
      <ListItem
        titleStyle={list.title}
        containerStyle={list.container}
        leftElement={<Text>{this.props.label}</Text>}
        title={this.props.value}
      />
    );
  }
}