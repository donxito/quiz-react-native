// https://reactnative.dev/docs/pressable

import { View, Text, StyleSheet, SafeAreaView, Modal } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizProvider";
import { useEffect, useState } from "react";

const SECONDS = 5; // seconds for the timer

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1, // take all the available space
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "80%",
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#005055",
    marginBottom: 20,
    textAlign: "center",
  },
  statText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
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
    isFinished,
    //bestScore,
    //setIsFinished,
  } = useQuiz();

  const [timer, setTimer] = useState(SECONDS);

  // * when the time is over, move to the next question
  useEffect(() => {
    if (timer <= 0) {
      onNext();
    }
  }, [timer, onNext]);

  // *
  useEffect(() => {
    // start count down
    setTimer(SECONDS);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);

          return 0;
        }
        return t - 1;
      });
    }, 1000);
    // clear interval when timer reaches 0
    return () => clearInterval(interval);
  }, [currentQuestion]);

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
        {currentQuestion && (
          <View>
            <QuestionCard question={currentQuestion} />
            <Text style={styles.time}>Time Left: {timer}s</Text>
          </View>
        )}

        {/* Footer */}
        {currentQuestion && (
          <Button
            title="Next"
            onPress={onNext}
            rightIcon={
              <FontAwesome6 name="arrow-right" size={16} color="white" />
            }
          />
        )}

        {/* Game Over Modal */}
        <Modal visible={isFinished} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.statsTitle}>Quiz Complete!</Text>
              <Text style={styles.statText}>
                Score: {score}/{totalQuestions}
              </Text>
              <Text style={styles.statText}>
                Percentage: {((score / totalQuestions) * 100).toFixed(1)}%
              </Text>
              <Button
                title="Play Again"
                onPress={restartQuiz}
                rightIcon={
                  <FontAwesome6 name="rotate" size={16} color="white" />
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
