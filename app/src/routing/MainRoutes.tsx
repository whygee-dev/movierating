import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigatorTheme } from "../theme/navigator";
import Movie from "../components/Movie";
import { MovieData } from "../screens/Home";
import AddMovie from "../components/AddMovie";

const Stack = createNativeStackNavigator();

type Props = {};

export type StackParamList = {
  Movie: { movie: MovieData };
};

const MainRoutes = (props: Props) => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer theme={navigatorTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Tabbed" component={TabNavigation} />
            <Stack.Screen name="Movie" component={Movie} />
            <Stack.Screen name="AddMovie" component={AddMovie} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;
