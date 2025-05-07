import { View } from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types/types";
import Card from "./Card";
import { useState } from "react";

type QuestionCard = {
  question: Question;
};

export default function QuestionCard({ question }: QuestionCard) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // * handle option selection
  const onOptionselected = (option: string) => {
    setSelectedOption(option);
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
