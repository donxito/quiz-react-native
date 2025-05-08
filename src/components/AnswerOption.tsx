import { Text, StyleSheet, Pressable } from "react-native";
import { useQuiz } from "../context/QuizProvider";

type AnswerOption = {
  option: string;
};

export default function AnswerOption({ option }: AnswerOption) {
  const { selectedOption, setSelectedOption } = useQuiz();

  const isSelected = selectedOption === option;

  return (
    <Pressable
      onPress={() => setSelectedOption?.(option)}
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
