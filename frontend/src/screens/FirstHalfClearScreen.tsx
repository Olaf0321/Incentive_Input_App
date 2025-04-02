import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const FirstHalfClearScreen = ({ navigation }: any) => {
  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>上期締め切り　上期データクリア</Text>
      <Text style={styles.subtitle}>マスタ</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress("FirstHalfCloseScreen")}>
          <Text style={styles.buttonText}>上期締め切りボタン</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("FirstHalfRecoveryScreen")}>
          <Text style={styles.buttonText}>上期入力復旧ボタン</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("FirstHalfDataClearScreen")}>
          <Text style={styles.buttonText}>上期データクリアボタン</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FirstHalfClearScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 120,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "60%", // Ensures all buttons have the same width
    height: 60,
    backgroundColor: "#2B5DAE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30, // Spacing between buttons
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
