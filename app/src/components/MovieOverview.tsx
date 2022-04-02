import React, { CSSProperties, useContext } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { MovieData } from "../screens/Home";
import Text from "./Text";
import Button from "./Button";
import { MovieContext } from "../context/MovieContext";

const MovieOverview = ({ movie }: { movie: MovieData }) => {
  const { genres } = useContext(MovieContext);

  return (
    <View style={styles.movie}>
      <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
        <Text numberOfLines={1} size={22} style={{ textAlign: "center", flex: 1, minHeight: 50 }}>
          {movie.original_title}
        </Text>
      </View>

      <View>
        <View style={styles.tags}>
          {movie.popularity! > 3000 && (
            <View style={styles.buttonALike}>
              <Text>Currently trending</Text>
            </View>
          )}

          {movie.popularity! > 1000 && (
            <View style={styles.buttonALike}>
              <Text> Popular</Text>
            </View>
          )}

          <View style={[styles.buttonALike, styles.orange]}>
            <Text color="#000" style={{ fontWeight: "700" }}>
              {movie.vote_average}
              <Text color="#000" size={10}>
                /10
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.genres}>
          <Text style={{ textAlign: "center" }} numberOfLines={2} size={15}>
            {new Date(movie.release_date!).getFullYear().toString()}
            {movie.genre_ids?.slice(0, 3).map((id) => "  \u2022  " + genres?.find((genre) => genre.id === id)?.name)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonALike: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    alignSelf: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  orange: {
    backgroundColor: "#FBBF0F",
  },
  tags: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 10,
  },
  movie: {
    position: "relative",
    top: Dimensions.get("window").height / 5,
    backgroundColor: "transparent",
    zIndex: 2,
  },
  genres: {
    marginTop: 10,
    maxWidth: "95%",
    alignSelf: "center",
  },
});

export default MovieOverview;
