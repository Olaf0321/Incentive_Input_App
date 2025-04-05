import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";

const AreaBusinessRegistrationScreen = ({ navigation }: any) => {
  const [className, setClassName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Handle registration logic
    console.log("Registered:", { className, loginId, password });
    if (className == "") Alert.alert("クラス名を入力してください");
    else if (loginId == "") Alert.alert("ログインIDを入力してください");
    else if (password == "") Alert.alert("パスワードを入力してください");
    else Alert.alert("正しく登録されました!");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>教室登録</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>教室名登録</Text>
        <TextInput
          style={styles.input}
          value={className}
          onChangeText={setClassName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ログインID登録</Text>
        <TextInput
          style={styles.input}
          value={loginId}
          onChangeText={setLoginId}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>パスワード登録</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>登録ボタン</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AreaBusinessRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 120,
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
    marginBottom: 40,
    width: "100%",
  },
  label: {
    fontSize: 16,
    width: 120,
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
