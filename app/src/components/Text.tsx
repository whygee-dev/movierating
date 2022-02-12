import React from "react";
import { Text, TextStyle } from "react-native";

type Props = {
  children?: any;
  color?: string;
  size?: number;
  style?: TextStyle;
};

const _Text = (props: Props) => {
  return <Text style={[{ color: props.color || "#fff", fontSize: props.size || 16 }, props.style]}>{props.children}</Text>;
};

export default _Text;
