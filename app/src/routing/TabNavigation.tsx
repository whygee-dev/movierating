import React, { useEffect, useState } from "react";
import { Image, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Account from "../screens/Account";
import UserMovies from "../screens/UserMovies";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarButton: isKeyboardVisible ? () => [] : undefined,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require("../../assets/icons/HomeActive.png") : require("../../assets/icons/Home.png")} />
          ),
        }}
      />

      <Tab.Screen
        name="UserMovies"
        component={UserMovies}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image width={16} height={18} source={focused ? require("../../assets/icons/ListActive.png") : require("../../assets/icons/List.png")} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require("../../assets/icons/ProfileActive.png") : require("../../assets/icons/Profile.png")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
