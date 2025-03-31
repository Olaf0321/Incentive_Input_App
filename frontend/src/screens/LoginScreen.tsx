import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, Dimensions, SafeAreaView
} from "react-native";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }: any) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (loginId === "admin" && password === "password") {
      navigation.navigate("DashboardScreen");
    } else {
      // Alert.alert("ログイン失敗", "正しいログインIDとパスワードを入力してください。");
      navigation.navigate("StaffDashboardScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ入力アプリ</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Login Interface */}
      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ログインID</Text>
          <TextInput
            style={styles.input}
            value={loginId}
            onChangeText={setLoginId}
            placeholder=""
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>パスワード</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder=""
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ログイン</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: width,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
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
  bottomContainer: {
    width: "100%", // Ensure full width
    paddingHorizontal: 20, // Equal margins on left and right
    marginBottom: 300,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    width: 100,
    marginRight: 10,
    textAlign: "right",
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    fontSize: 16,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  button: {
    marginTop: 50,
    width: "100%", // Ensures equal left and right spacing
    alignItems: "center", // Centers text inside button
  },
  buttonText: {
    backgroundColor: "#2B5DAE",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
});
