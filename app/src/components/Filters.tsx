import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Genre } from "../context/MovieContext";
import Text from "./Text";

type Props = {
  genres: Genre[];
  onSelect: (filters: Genre[]) => any;
};

const Filters = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<Genre[]>([]);

  const onFilterSelect = (filter: Genre) => {
    if (filters.findIndex((f) => f.id === filter.id) !== -1) {
      setFilters(filters.filter((f) => f.id !== filter.id));
    } else {
      setFilters([...filters, filter]);
    }
  };

  const onClose = () => {
    setModalOpen(false);

    setTimeout(() => props.onSelect(filters), 500);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalOpen(true)} style={styles.container}>
        <Icon name="filter" size={20} color="#fff"></Icon>
      </TouchableOpacity>
      <Modal
        style={{ padding: 0, margin: 0 }}
        isVisible={modalOpen}
        onBackdropPress={() => onClose()}
        onSwipeComplete={() => onClose()}
        swipeDirection="down"
      >
        <View style={styles.genres}>
          <View style={styles.swipableIndicator}></View>
          {props.genres.map((genre) => {
            return (
              <TouchableOpacity key={genre.id} onPress={() => onFilterSelect(genre)}>
                <View style={[styles.genre, { backgroundColor: filters.find((f) => f.id === genre.id) ? "#050527" : "#1a1a40" }]}>
                  <Text color="#fff">{genre.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "white",
  },

  genres: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: window.height / 1.85,
    backgroundColor: "#232356",
    position: "absolute",
    bottom: 0,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 20,
  },

  genre: {
    margin: window.height / 100,
    borderRadius: 10,
    padding: 8,
  },

  swipableIndicator: {
    position: "absolute",
    top: 10,
    left: window.width / 2 - 25,
    width: 50,
    height: 5,
    backgroundColor: "#050527",
    borderRadius: 8,
  },
});

export default Filters;
