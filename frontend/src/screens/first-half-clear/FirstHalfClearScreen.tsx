import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import SERVER_URL from "../../../config";

const FirstHalfClearScreen = ({ navigation }: any) => {
  const handlePress = async (screen: string) => {
    try {
      let period = '上期入力';
      let status: Boolean = false;
      if (screen == "FirstHalfCloseScreen") status = false;
      else status = true;
      const response = await fetch(`${SERVER_URL}api/inputPossibility/${period}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          period: period,
          status: status
        })
      });
      const data = await response.json();
      if (screen == 'FirstHalfCloseScreen') {
        Alert.alert('上期締の入力が制限されました。');
      } else if (screen == 'FirstHalfRecoveryScreen') {
        Alert.alert('上期締の入力が復帰しました。');
      } else {
        Alert.alert('上期締のデータを削除しました。');
      }
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
    // navigation.navigate(screen);
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
