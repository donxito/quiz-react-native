import { View, Text, StyleSheet } from "react-native";

type AnswerOption = {
  option: string;
  isSelected?: boolean;
};

export default function AnswerOption({ option, isSelected }: AnswerOption) {
  return (
    <View
      style={[
        styles.container,
        isSelected && { backgroundColor: "#E1F396", borderColor: "#A3C300" },
      ]}
    >
      <Text>{option}</Text>
    </View>
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
