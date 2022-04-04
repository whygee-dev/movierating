import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, Image, FlatList, ViewToken, Pressable, ActivityIndicator } from "react-native";
import { MovieData } from "../screens/Home";
import { POSTER_BASE } from "../tools/constants";
import Text from "./Text";

const MovieList = ({
  data,
  onItemChange,
  onItemPress,
  onLazyLoad,
  loading,
  index,
}: {
  data?: MovieData[];
  onItemChange: (item: MovieData) => any;
  onItemPress: (item: MovieData) => any;
  onLazyLoad: () => any;
  loading?: boolean;
  index: number;
}) => {
  const [movies, setMovies] = useState(data || []);

  useEffect(() => {
    setMovies(data || []);
  }, [data]);

  useEffect(() => {
    if (movies.length > 0 && movies.length > index) {
      ref.current?.scrollToIndex({ animated: index !== 0, index });
    }
  }, [index]);

  const _renderItem = ({ item, index }: { item: MovieData; index: number }) => {
    return (
      <Pressable onPress={() => onItemPress(item)}>
        <View
          style={{
            width: Dimensions.get("window").width / 3,
            height: Dimensions.get("window").height / 3,
            marginHorizontal: 25,
            borderRadius: 12,
          }}
        >
          <Image
            source={{ uri: POSTER_BASE + item.poster_path }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 2,
              borderRadius: 12,
            }}
          ></Image>
        </View>
      </Pressable>
    );
  };

  const _onViewableItemsChanged = useRef(({ viewableItems, changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    const item = viewableItems[0];
    onItemChange(item?.item);
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const ref = useRef<FlatList>(null);

  return (
    <View style={{ width: "100%", position: "relative", zIndex: 2, top: Dimensions.get("window").height / 3.25 }}>
      {data?.length === 0 && !loading ? (
        <Text size={22} style={{ alignSelf: "center" }}>
          No results found :(
        </Text>
      ) : null}
      {data && (
        <View>
          <FlatList
            ref={ref}
            horizontal
            data={movies}
            renderItem={_renderItem}
            onViewableItemsChanged={_onViewableItemsChanged.current}
            viewabilityConfig={viewConfigRef.current}
            onEndReachedThreshold={0.5}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd < 0) return;

              onLazyLoad();
            }}
            initialScrollIndex={index}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                ref.current?.scrollToIndex({ index: info.index, animated: true });
              });
            }}
          ></FlatList>

          {loading && (
            <View
              style={{
                position: "relative",
                top: 10,
              }}
            >
              <ActivityIndicator animating size={65} color="#FA58B6"></ActivityIndicator>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default MovieList;
