import { View, Text, StyleSheet } from "react-native";
import AnswerOption from "./AnswerOption";

export default function QuestionCard() {
  return (
    <View style={styles.QuestionCard}>
      <Text style={styles.question}>What is Life?</Text>

      <View style={{ gap: 10 }}>
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  QuestionCard: {
    backgroundColor: "#f9f9f9", // light grey background for the card
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    gap: 20,

    // shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  question: {
    fontSize: 24,
    fontWeight: "500",
  },
});
