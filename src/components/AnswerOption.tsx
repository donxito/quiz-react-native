import { View, Text, StyleSheet, Pressable } from "react-native";

type AnswerOption = {
  option: string;
  isSelected?: boolean;
  onPress: () => void; // doesn return anything
};

export default function AnswerOption({
  option,
  isSelected,
  onPress,
}: AnswerOption) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#E1F396" }} // ripple effect on android
      style={[
        styles.container,
        isSelected && { backgroundColor: "#E1F396", borderColor: "#A3C300" },
      ]}
    >
      <Text>{option}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 20,
    borderRadius: 100,
  },
});
