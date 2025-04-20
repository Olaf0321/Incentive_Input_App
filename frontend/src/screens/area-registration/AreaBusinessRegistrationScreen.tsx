import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions
} from "react-native";
import SERVER_URL from "../../../config";

const { width, height } = Dimensions.get("window");

const AreaBusinessRegistrationScreen = ({ navigation }: any) => {
  const [className, setClassName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (className === "") Alert.alert("クラス名を入力してください");
      else if (loginId === "") Alert.alert("ログインIDを入力してください");
      else if (password === "") Alert.alert("パスワードを入力してください");
      else {
        const response = await fetch(`${SERVER_URL}api/classrooms/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: className,
            loginId: loginId,
            password: password
          })
        });
        const data = await response.json();
        Alert.alert(`${data.msg}`);
        if (data.code === 1) {
          setClassName("");
          setLoginId("");
          setPassword("");
        }
      }
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>教室登録</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
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
      </View>
    </SafeAreaView>
  );
};

export default AreaBusinessRegistrationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: width * 0.045,
    color: "#555",
    marginTop: 5,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  label: {
    width: "35%",
    fontSize: width * 0.04,
    marginRight: 10,
    textAlign: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: "#000",
    fontSize: width * 0.04,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  button: {
    marginTop: 40,
    alignItems: "center",
  },
  buttonText: {
    backgroundColor: "#2B5DAE",
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    textAlign: "center",
  },
});
