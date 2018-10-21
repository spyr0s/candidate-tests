import { createDrawerNavigator } from "react-navigation";
import FiltersMenu from "../screens/filters/FiltersMenu";
import { scale } from "../styles/scaling";
import CharactersScreen from "../screens/characters/Characters";

export const DrawerStack = createDrawerNavigator(
  {
    characters: {
      screen: CharactersScreen,
      navigationOptions: {
        title: "Rick And Morty Characters"
      }
    }
  },
  {
    navigationOptions: {},
    drawerPosition: "right",
    initialRouteName: "characters",
    contentComponent: FiltersMenu,
    drawerWidth: scale(280)
  }
);
