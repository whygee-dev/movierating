import React, { useContext, useEffect, useState } from "react";
import { View, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { POSTER_BASE } from "../tools/constants";
import MovieList from "../components/MovieList";
import Icon from "react-native-vector-icons/Ionicons";
import { Genre, MovieContext } from "../context/MovieContext";
import { genSearchUrl, genUrl } from "../tools/TMDB/generator";
import MovieOverview from "../components/MovieOverview";
import Filters from "../components/Filters";

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: string;
};

const Home = ({ navigation }: any) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [currentItem, setCurrentItem] = useState(movies && movies[0]);
  const [searchInput, setSearchInput] = useState("");
  const { genres } = useContext(MovieContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState<number[]>([]);
  const [filters, setFilters] = useState<Genre[]>([]);
  const [fetchTimeout, setFetchTimeout] = useState<any>(null);

  useEffect(() => {
    if (!searchInput || searchInput.length === 0) {
      clearTimeout(fetchTimeout);
      setPage(1);
      fetch(1, false);

      return;
    }

    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }

    setFetchTimeout(setTimeout(() => search(), 500));
  }, [searchInput, filters]);

  if (error || (!loading && !movies)) {
    console.warn("TMDB API RESPONSE FAILURE");
  }

  const fetch = async (page: number, append = true) => {
    setLoading(true);

    try {
      const results = (
        await axios.get<{ results: MovieData[] }>(
          genUrl(
            "discover/movie",
            page,
            filters.map((f) => f.id)
          )
        )
      ).data;

      if (append) {
        setMovies([...movies, ...results.results]);
        setPagesCount([...pagesCount, results.results.length]);
      } else {
        setMovies(results.results);
        setPagesCount([results.results.length]);
      }
    } catch (error) {
      setError(error as any);
    } finally {
      setLoading(false);
    }
  };

  const onLazyLoad = () => {
    if (searchInput || searchInput.length !== 0 || page >= 500) {
      return;
    }

    setPage(page + 1);
    fetch(page + 1);
  };

  const search = async () => {
    const search = await (await axios.get(genSearchUrl("search/multi", searchInput))).data?.results;

    setMovies(search);
    setPagesCount([search.length]);
  };

  const handleItemChange = (item: MovieData) => {
    setCurrentItem(item);
  };

  const handleMoviePress = (movie: MovieData) => {
    navigation.navigate("Movie", { movie });
  };

  const onFiltersSelect = (filters: Genre[]) => {
    setFilters(filters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Filters genres={genres!} onSelect={onFiltersSelect}></Filters>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="white" onChangeText={(t) => setSearchInput(t)}></TextInput>
          <Icon name="search" style={styles.searchIcon} color="#fff" size={18}></Icon>
        </View>
      </View>

      {currentItem && <MovieOverview movie={currentItem}></MovieOverview>}

      <View style={styles.imageFilter}></View>
      <Image source={{ uri: POSTER_BASE + currentItem?.poster_path }} resizeMode="cover" style={styles.image}></Image>

      <MovieList
        data={movies}
        index={pagesCount.length <= 1 ? 0 : pagesCount.reduce((acc, v) => acc + v, 0) - pagesCount[pagesCount.length - 1] - 1}
        loading={loading}
        onItemChange={handleItemChange}
        onItemPress={handleMoviePress}
        onLazyLoad={onLazyLoad}
      ></MovieList>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#F00100",
    alignSelf: "center",
    width: "33%",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginTop: 20,
  },
  addButtonTitle: {
    fontSize: 14,
  },
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
  currentMovie: {
    position: "relative",
    top: Dimensions.get("window").height / 5,
    backgroundColor: "transparent",
    zIndex: 2,
  },
  genres: {
    marginTop: 10,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "absolute",
    top: 10,
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 2,
  },
  inputContainer: {
    width: "80%",
    position: "relative",
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    paddingTop: 15,
    width: "100%",
    borderColor: "white",
    borderRadius: 16,
    fontFamily: "Poppins-Regular",
    color: "white",
  },
  searchIcon: {
    position: "absolute",
    top: "33%",
    right: 20,
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").height,
    position: "absolute",
    zIndex: 0,
  },
  imageFilter: {
    width: "100%",
    height: Dimensions.get("window").height,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});

export default Home;
