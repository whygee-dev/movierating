import React, { useContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { WHO_AMI } from "../graphql/queries/user/WhoAmI";
import { UserContext } from "../context/UserContext";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import { genUrl } from "../tools/TMDB/generator";
import { GET_MOVIES } from "../graphql/queries/user/GetMovies";

const Splash = ({ children }: { children?: any }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setGenres, setMoviesList } = useContext(MovieContext);
  const [getUser, { error }] = useLazyQuery(WHO_AMI);
  const [getMovies] = useLazyQuery(GET_MOVIES);
  const url = genUrl("genre/movie/list");

  const startAsync = async () => {
    const user = await (await getUser())?.data?.whoAmI;
    const genres = await (await axios.get(url)).data?.genres;
    await Font.loadAsync({ "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf") });
    setUser(user);
    setGenres(genres);

    if (user) {
      const movies = await (await getMovies())?.data?.getMovies?.movies;
      setMoviesList(movies.map((m: any) => m.tmdbId));
    }
  };

  if (!appIsReady) {
    return <AppLoading startAsync={startAsync} onFinish={() => setAppIsReady(true)} onError={console.warn} />;
  }

  return <>{children}</>;
};

export default Splash;
