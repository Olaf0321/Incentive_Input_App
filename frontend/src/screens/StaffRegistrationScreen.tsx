import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const StaffRegistrationScreen = ({ navigation }: any) => {
  const [staffName, setStaffName] = useState("");
  const [areaBusiness, setAreaBusiness] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const handleRegister = () => {
    console.log("Registered:", { staffName, areaBusiness, employmentType });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>スタッフ登録</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>スタッフ名登録</Text>
        <TextInput
          style={styles.input}
          value={staffName}
          onChangeText={setStaffName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>エリア及び事業選択</Text>
        <TextInput
          style={styles.input}
          value={areaBusiness}
          onChangeText={setAreaBusiness}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>正社員・アルバイト選択</Text>
        <TextInput
          style={styles.input}
          value={employmentType}
          onChangeText={setEmploymentType}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>登録ボタン</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StaffRegistrationScreen;

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
    width: 160, // Adjusted for alignment with the image
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
