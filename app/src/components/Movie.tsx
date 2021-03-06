import React, { useContext } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { POSTER_BASE } from "../tools/constants";
import MovieOverview from "./MovieOverview";
import Text from "./Text";
import Button from "./Button";
import BackButton from "./BackButton";
import { MovieContext } from "../context/MovieContext";

const Movie = ({ route, navigation }: any) => {
  const movie = route?.params?.movie;
  const { moviesList } = useContext(MovieContext);

  if (!movie) {
    //@ts-ignore
    navigation.navigate("Home");

    return <></>;
  }

  const handleAddMovie = () => {
    navigation.navigate("AddMovie", { movie });
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}></BackButton>

      <ScrollView style={styles.overviewContainer}>
        <View style={styles.posterContainer}>
          <Image source={{ uri: POSTER_BASE + movie.poster_path }} resizeMode="contain" style={styles.poster}></Image>
        </View>

        <View style={styles.overview}>
          <MovieOverview movie={movie}></MovieOverview>
        </View>

        <Text numberOfLines={Number.MAX_SAFE_INTEGER} size={18} style={styles.description}>
          {movie.overview}
        </Text>
      </ScrollView>

      {!moviesList.includes(movie.id) && (
        <View style={styles.addButtonBackdrop}>
          <Button containerStyle={styles.addButton} titleStyle={styles.addButtonTitle} title="ADD TO LIST" onPress={handleAddMovie}></Button>
        </View>
      )}

      <View style={styles.imageFilter}></View>
      <Image source={{ uri: POSTER_BASE + movie.backdrop_path }} resizeMode="cover" style={styles.backdrop}></Image>
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: window.height,
  },
  posterContainer: {
    position: "relative",
    width: "75%",
    height: window.height / 2.5,
    zIndex: 2,
    alignSelf: "center",
  },
  poster: {
    height: "100%",
  },
  overviewContainer: {
    height: window.height,
    position: "relative",
    top: 0,
    zIndex: 2,
  },
  overview: {
    position: "relative",
    top: -window.height / 5.5,
  },
  description: {
    maxWidth: "95%",
    textAlign: "justify",
    alignSelf: "center",
    marginTop: 30,
    paddingBottom: 50,
  },
  addButtonBackdrop: {
    position: "absolute",
    top: window.height / 1.09,
    width: "100%",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: 80,
    borderTopStartRadius: 200,
    borderTopEndRadius: 200,
  },
  addButton: {
    backgroundColor: "#F00100",
    alignSelf: "center",
    width: "33%",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginTop: 10,
  },
  addButtonTitle: {
    fontSize: 14,
  },
  backdrop: {
    width: "100%",
    height: window.height,
    position: "absolute",
    zIndex: 0,
  },
  imageFilter: {
    width: "100%",
    height: window.height,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
export default Movie;
