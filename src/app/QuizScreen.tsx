// https://reactnative.dev/docs/pressable

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import QuestionCard from "../components/QuestionCard";
import Card from "../components/Card";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizProvider";

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
  const {
    currentQuestion,
    questionCount,
    totalQuestions,
    onNext,
    score,
    restartQuiz,
  } = useQuiz();

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Question {questionCount}/{totalQuestions}
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
            <Text>
              Correct answers: {score}/{totalQuestions}
            </Text>
            <Text>
              Correct percentage: {((score / totalQuestions) * 100).toFixed(2)}%
            </Text>
          </Card>
        )}

        {/* Footer */}

        <Button
          title={currentQuestion ? "Next" : "Restart"}
          onPress={currentQuestion ? onNext : restartQuiz}
          onLongPress={() => console.warn("long press")}
          rightIcon={
            currentQuestion ? (
              <FontAwesome6 name="arrow-right" size={16} color="white" />
            ) : (
              <FontAwesome6 name="rotate" size={16} color="white" />
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}
