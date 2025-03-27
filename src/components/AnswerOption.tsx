import { View, Text, StyleSheet } from "react-native";

export default function AnswerOption() {
  return (
    <View style={styles.container}>
      <Text>Answer Option</Text>
    </View>
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
