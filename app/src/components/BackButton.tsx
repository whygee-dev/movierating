import React from "react";
import { Pressable, StyleSheet, View, Image } from "react-native";

const BackButton = ({ navigation }: any) => {
  return (
    <View style={styles.backButtonBackdrop}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require("../../assets/icons/ArrowLeft.png")} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonBackdrop: {
    position: "relative",
    left: 0,
    top: 0,
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    marginBottom: 10,
  },
  backButton: {
    position: "relative",
    top: 0,
    left: 30,
    width: 40,
    height: 40,
  },
});

export default BackButton;
