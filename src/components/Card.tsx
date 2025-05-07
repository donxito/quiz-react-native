import { View, Text, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";

type Card = PropsWithChildren<{
  title: string;
}>;

export default function Card({ title, children }: Card) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
});
