import React from "react";
import { Text, StyleSheet, Pressable, GestureResponderEvent, ViewStyle, TextStyle } from "react-native";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  children?: any;
};

export default function Button(props: Props) {
  const { onPress, title = "Save" } = props;

  return (
    <Pressable style={[styles.button, props.containerStyle]} onPress={onPress}>
      <Text style={[styles.text, props.titleStyle]}>{title}</Text>
      {props.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#232356",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
