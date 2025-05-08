import { View } from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types/types";
import Card from "./Card";
import { useQuiz } from "../context/QuizProvider";

type QuestionCard = {
  question: Question;
};

export default function QuestionCard({ question }: QuestionCard) {
  return (
    <Card title={question.question}>
      <View style={{ gap: 10 }}>
        {question.options.map((option, index) => (
          <AnswerOption key={index} option={option} />
        ))}
      </View>
    </Card>
  );
}
