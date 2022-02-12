import React from "react";
import { View, StyleSheet, Dimensions, Image, Pressable, TouchableOpacity, Text } from "react-native";
import { Link, useHistory, useLocation } from "react-router-native";

const TabNavigation = () => {
  const location = useLocation();

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/" underlayColor="rgba(0, 0, 0, 0)" style={styles.navItem}>
          <Image source={location.pathname === "/" ? require("../../assets/icons/HomeActive.png") : require("../../assets/icons/Home.png")} />
        </Link>
        <Link to="/account" underlayColor="rgba(0, 0, 0, 0)" style={styles.navItem}>
          <Image
            source={location.pathname === "/account" ? require("../../assets/icons/ProfileActive.png") : require("../../assets/icons/Profile.png")}
          />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: Dimensions.get("window").height - 85,
    left: 0,
  },
});

export default TabNavigation;
