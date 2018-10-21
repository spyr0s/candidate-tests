import { createStackNavigator } from "react-navigation";
import { DrawerStack } from "./DrawerStack";
import CharacterScreen from "../screens/character/Character";
import { rightToLeftTransition } from "./Transitions";
import { COLORS } from "../styles";

export const MainStack = createStackNavigator(
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
    transitionConfig: rightToLeftTransition,
    navigationOptions: {
      headerTitle: "Rick And Morty Characters",
      title: "Rick And Morty Characters",
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
