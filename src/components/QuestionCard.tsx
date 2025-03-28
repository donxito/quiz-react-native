import { View, Text, StyleSheet } from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types";

type QuestionCard = {
  question: Question;
};

export default function QuestionCard({ question }: QuestionCard) {
  // console.log(props);

  const selectedOption = question.options[3];

  return (
    <View style={styles.QuestionCard}>
      <Text style={styles.question}>{question.title}</Text>

      <View style={{ gap: 10 }}>
        <AnswerOption
          isSelected={selectedOption === question.options[0]}
          option={question.options[0]}
        />
        <AnswerOption
          isSelected={selectedOption === question.options[1]}
          option={question.options[1]}
        />
        <AnswerOption
          isSelected={selectedOption === question.options[2]}
          option={question.options[2]}
        />
        <AnswerOption
          isSelected={selectedOption === question.options[3]}
          option={question.options[3]}
        />
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
