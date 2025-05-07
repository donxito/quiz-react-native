// https://reactnative.dev/docs/pressable

import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions";
import Card from "../components/Card";
import Button from "../components/Button";

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

// * Question
const question = questions[6];
export default function QuizScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Question 1/5</Text>
        </View>

        {/* Question Card */}

        {question ? (
          <View>
            <QuestionCard question={question} />
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
          onPress={() => console.warn("pressed next")}
          onLongPress={() => console.warn("long press")}
          rightIcon={
            <FontAwesome6 name="arrow-right" size={16} color="white" />
          }
        />
      </View>
    </SafeAreaView>
  );
}
