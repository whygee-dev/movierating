import React, { useContext } from "react";
import { View } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";
import PrivateRoute from "../components/PrivateRoute";
import { UserContext } from "../context/UserContext";
import Account from "../screens/Account";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigation from "./TabNavigation";

type Props = {};

const MainRoutes = (props: Props) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <NativeRouter initialEntries={user ? ["/"] : ["/login"]}>
      <Switch>
        <PrivateRoute user={user} exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute user={user} exact path="/account" component={Account} />
      </Switch>

      {user && <TabNavigation></TabNavigation>}
    </NativeRouter>
  );
};

export default MainRoutes;
