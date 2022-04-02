import React from "react";
import { Redirect, Route } from "react-router-native";

type Props = {
  component: () => JSX.Element;
  user: any;
  [rest: string]: any;
};

const PrivateRoute = (props: Props) => {
  if (!props.user) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return <Route {...props.rest} component={props.component} />;
};

export default PrivateRoute;
