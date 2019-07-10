import { createStackNavigator, createAppContainer } from "react-navigation";

import GameScreen from "./app/screen/game";

const MainNavigation = createStackNavigator(
  {
    Game: { screen: GameScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    },
    initialRouteName: "Game"
  }
);

const App = createAppContainer(MainNavigation);

export default App;
