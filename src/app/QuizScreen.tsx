// https://reactnative.dev/docs/pressable

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions";
import Card from "../components/Card";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { Question } from "../types/types";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1, // take all the available space
    //alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
  },
  header: {},
  title: {
    textAlign: "center",
    color: "#005055",
  },
  time: {
    textAlign: "center",
    color: "#005055",
    marginTop: 15,
    fontWeight: "bold",
  },
});

export default function QuizScreen() {
  const [availableQuestions, setAvailableQuestions] = useState([...questions]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionCount, setQuestionCount] = useState(0);

  // * Initialize the quiz with a random question
  useEffect(() => {
    selectRandomQuestion();
  }, []);

  const selectRandomQuestion = () => {
    if (availableQuestions.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    // * Remove the selected question from available questions
    setAvailableQuestions((prev) =>
      prev.filter((_, index) => index !== randomIndex)
    );
    setCurrentQuestion(selectedQuestion);
    setQuestionCount((prev) => prev + 1);
  };

  // * Handle next question
  const onNextQuestion = () => {
    selectRandomQuestion();
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Question {questionCount}/{questions.length}
          </Text>
        </View>

        {/* Question Card */}
        {currentQuestion ? (
          <View>
            <QuestionCard question={currentQuestion} />
            <Text style={styles.time}>20 sec</Text>
          </View>
        ) : (
          <Card title="No more questions available">
            <Text>Correct answers: 3/5</Text>
            <Text>Score: 80%</Text>
          </Card>
        )}

        {/* Footer */}
        <Button
          title="Next"
          onPress={onNextQuestion}
          onLongPress={() => console.warn("long press")}
          rightIcon={
            <FontAwesome6 name="arrow-right" size={16} color="white" />
          }
        />
      </View>
    </SafeAreaView>
  );
}
