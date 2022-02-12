import React, { useContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { WHO_AMI } from "../graphql/mutations/user/WhoAmI";
import { UserContext } from "../context/UserContext";
import AppLoading from "expo-app-loading";

const Splash = ({ children }: { children?: any }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setUser } = useContext(UserContext);
  const [getUser] = useLazyQuery(WHO_AMI);

  const startAsync = async () => {
    const user = await (await getUser()).data.WhoAmI;
    setUser(user);
    console.log(user);
  };

  if (!appIsReady) {
    return <AppLoading startAsync={startAsync} onFinish={() => setAppIsReady(true)} onError={console.warn} />;
  }

  return <>{children}</>;
};

export default Splash;
