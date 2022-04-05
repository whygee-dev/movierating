import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions, Image, Pressable } from "react-native";
import { GET_MOVIES } from "../graphql/queries/user/GetMovies";
import Text from "../components/Text";
import { POSTER_BASE } from "../tools/constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

type MovieData = {
  title: string;
  tmdbId: number;
  review: string;
  rating: number;
  posterPath: string;
  backdropPath: string;
};

const UserMovies = ({ navigation }: any) => {
  const { data, error, loading, refetch } = useQuery<{ getMovies: { movies: MovieData[] } }>(GET_MOVIES);
  const [movies, setMovies] = useState(data?.getMovies.movies || []);

  useEffect(() => {
    setMovies(data?.getMovies.movies || []);
  }, [data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      {!loading && movies.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyText} size={24} numberOfLines={2}>
            Your list is emptier than Eren Yeager's eyes :(
          </Text>

          <Image style={{ width: 300, height: 200 }} source={{ uri: "https://i.ibb.co/3sqN6Tp/eren-empty-eyes.webp" }} />
        </View>
      ) : (
        <View style={styles.headingContainer}>
          <Text size={36}>
            Your list <Text size={18}>(tap to edit)</Text>
          </Text>
        </View>
      )}
      {loading && <ActivityIndicator style={styles.loading} animating size={72} color="#FA58B6"></ActivityIndicator>}

      {!loading && data && (
        <ScrollView showsVerticalScrollIndicator style={styles.scrollView}>
          {movies.map((movie) => {
            return (
              <TouchableOpacity onPress={() => console.log("yo")}>
                <View key={movie.tmdbId} style={styles.movie}>
                  <View style={styles.posterContainer}>
                    <Image source={{ uri: POSTER_BASE + movie.posterPath }} resizeMode="contain" style={styles.poster}></Image>

                    <View style={styles.buttonALike}>
                      <Text style={styles.rating} color="#000">
                        {movie.rating}
                        <Text color="#000" size={10}>
                          /10
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={styles.textContainer}>
                    <Text numberOfLines={2} size={24}>
                      {movie.title}
                    </Text>

                    <Text numberOfLines={10} size={16}>
                      {movie.review.slice(0, 75) + (movie.review.length > 75 ? "..." : "")}
                    </Text>
                  </View>

                  <View style={styles.imageFilter}></View>
                  <Image source={{ uri: POSTER_BASE + movie.backdropPath }} resizeMode="cover" style={styles.backdrop}></Image>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {},
  buttonALike: {
    backgroundColor: "#FBBF0F",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "center",
  },
  rating: {
    fontWeight: "700",
    position: "relative",
    zIndex: 2,
  },
  headingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  emptyListContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: window.height,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 30,
  },
  loading: {
    position: "absolute",
    top: window.height / 2 - 36,
    left: window.width / 2 - 36,
  },
  scrollView: {
    height: window.height / 1.3,
    marginTop: 10,
  },
  movie: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "95%",
    height: 170,
    marginHorizontal: "2.5%",
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: "#101010",
    position: "relative",
  },
  posterContainer: {
    position: "relative",
    width: "25%",
    height: window.height / 4,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  poster: {
    height: "60%",
  },
  textContainer: {
    marginLeft: 20,
    position: "relative",
    zIndex: 2,
    maxWidth: "72.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "80%",
  },
  backdrop: {
    width: "112%",
    height: "100%",
    position: "absolute",
    borderRadius: 12,
    zIndex: -1,
  },
  imageFilter: {
    width: "112%",
    height: "100%",
    position: "absolute",
    borderRadius: 12,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});

export default UserMovies;
