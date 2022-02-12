import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, View, Dimensions } from "react-native";
import MainRoutes from "./src/routing/MainRoutes";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import UserContextProvider, { UserContext } from "./src/context/UserContext";
import { API_URI } from "./src/tools/constants";
import Splash from "./src/components/Splash";
import { setContext } from "@apollo/client/link/context";
import { get } from "./src/tools/store";

export default function App() {
  console.log("api", API_URI);

  const httpLink = new HttpLink({
    uri: API_URI + "/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await get("token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink.concat(httpLink)]),
    uri: API_URI + "/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View>
        <Image
          source={require("./assets/bg.png")}
          style={{
            width: "100%",
            height: Dimensions.get("window").height,
            position: "absolute",
            zIndex: -100000000,
          }}
        ></Image>
      </View>

      <StatusBar animated style="dark" hidden />

      <ApolloProvider client={client}>
        <UserContextProvider>
          <Splash>
            <MainRoutes></MainRoutes>
          </Splash>
        </UserContextProvider>
      </ApolloProvider>
    </View>
  );
}
