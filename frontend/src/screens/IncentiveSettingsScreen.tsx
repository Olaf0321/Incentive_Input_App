import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const IncentiveSettingsScreen = ({ navigation }: any) => {
  const [salaryItem, setSalaryItem] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [grade, setGrade] = useState("");

  const handleRegister = () => {
    console.log("Registered:", { salaryItem, unitPrice, grade });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ　項目設定</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>給与項目名登録</Text>
        <TextInput
          style={styles.input}
          value={salaryItem}
          onChangeText={setSalaryItem}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>単価登録</Text>
        <TextInput
          style={styles.input}
          value={unitPrice}
          onChangeText={setUnitPrice}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>等級登録</Text>
        <TextInput
          style={styles.input}
          value={grade}
          onChangeText={setGrade}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>登録ボタン</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IncentiveSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    width: 160, // Adjusted for alignment
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 16,
    padding: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2B5DAE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
