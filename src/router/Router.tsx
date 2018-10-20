import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import { COLORS } from "../styles";
import CharactersScreen from "../screens/characters/Characters";
import CharacterScreen from "../screens/character/Character";
import { Easing, Animated, View } from "react-native";
import { scale } from "../styles/scaling";
import FiltersMenu from "../screens/filters/FiltersMenu";
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

const DrawerStack = createDrawerNavigator(
  {
    characters: {
      screen: CharactersScreen,
      navigationOptions: {
        title: "Rick And Morty Characters"
      }
    }
  },
  {
    navigationOptions: {
      

    },
    drawerPosition: "right",
    initialRouteName: "characters",
    contentComponent: FiltersMenu,
    drawerWidth: scale(280)
  }
);

const MainStack = createStackNavigator(
  {
    drawer: DrawerStack,
    character: {
      screen: CharacterScreen,
      navigationOptions: {
        title: "Character"
      }
    }
  },
  {
    headerMode: "float",
    initialRouteName: "drawer",
    transitionConfig,
    navigationOptions: {
      headerTitle:"Rick And Morty Characters",
      title:"Rick And Morty Characters",
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
