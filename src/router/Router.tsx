import React from "react";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import { COLORS } from "../styles";
import CharactersScreen from "../screens/characters/Characters";
import CharacterScreen from "../screens/character/Character";
import { Easing, Animated } from "react-native";
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };

      return slideFromRight;
    }
  };
};

const MainStack = createStackNavigator(
  {
    characters: {
      screen: CharactersScreen,
      navigationOptions: {
        title: "Rick And Morty Characters"
      }
    },
    character: {
      screen: CharacterScreen,
      navigationOptions: {
        title: "Character"
      }
    }
  },
  {
    headerMode: "float",
    initialRouteName: "characters",
    transitionConfig,
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.PRIMARY
      },
      headerTintColor: COLORS.LIGHT,
      headerTitleStyle: {
        color: COLORS.TINT,
        flex: 1,
        fontWeight: "500",
        textAlign: "center"
      }
    }
  }
);

const Router = createSwitchNavigator(
  {
    mainStack: MainStack
  },
  {
    initialRouteName: "mainStack"
  }
);

export default class AppComponent extends React.Component {
  render() {
    return (
      <Router
        //renderLoadingExperimental={() => <Loader visible={true} />}
        //persistenceKey={"NavigationState"}
        style={{ backgroundColor: COLORS.DARK }}
      />
    );
  }
}
