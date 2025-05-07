import { View } from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types/types";
import Card from "./Card";

type QuestionCard = {
  question: Question;
};

export default function QuestionCard({ question }: QuestionCard) {
  console.log(question);

  const selectedOption = question.correctAnswer; // This should be replaced with the actual selected option from the state

  const onOptionselected = (option: string) => {
    console.warn("pressed: ", option);
  };

  return (
    <Card title={question.question}>
      <View style={{ gap: 10 }}>
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            isSelected={selectedOption === option}
            option={option}
            onPress={() => onOptionselected(option)}
          />
        ))}
      </View>
    </Card>
  );
}
