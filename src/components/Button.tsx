import {
  Pressable,
  StyleSheet,
  Text,
  View,
  //PressableProps,
} from "react-native";
import { ComponentProps } from "react";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#005055",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  rightIcon: {
    position: "absolute",
    right: 20,
  },
});

type Button = {
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
} & ComponentProps<typeof Pressable>;

export default function Button({
  title,
  rightIcon,
  ...ComponentProps
}: Button) {
  return (
    <Pressable style={styles.button} {...ComponentProps}>
      <Text style={styles.buttonText}>{title}</Text>

      <View style={styles.rightIcon}>{rightIcon}</View>
    </Pressable>
  );
}
