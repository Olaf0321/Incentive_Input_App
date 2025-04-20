import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, Dimensions, SafeAreaView, ScrollView
} from "react-native";

import SERVER_URL from "../../../config";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${SERVER_URL}api/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          loginId,
          password
        })
      });

      const data = await response.json();
      console.log("data", data);

      if (data.code != 3) Alert.alert(`${data.msg}`);
      else {
        if (data.check) navigation.navigate('ダッシュボード');
        else navigation.navigate('スタッフダッシュボード', {
          employee: { name }
        });
      }

    } catch (err) {
      Alert.alert(`${err}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ入力アプリ</Text>
      </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>名前</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder=""
            />
          </View>

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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    paddingBottom: 40,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 25,
  },
  label: {
    width: "25%",
    fontSize: width * 0.04,
    marginRight: 10,
    textAlign: "right",
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
