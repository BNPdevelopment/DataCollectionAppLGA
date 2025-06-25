import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const explore = () => {
  return (
    <View style={styles.container}>
      <Text> </Text>
      <Text> </Text>
      <Text style={styles.text}>LGA Data Collection</Text>
      <Image source={require("../BNP_logo.png")} />
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "gray",
    color: "black",
    fontSize: 24,
    textAlign: "center",
  },
});
