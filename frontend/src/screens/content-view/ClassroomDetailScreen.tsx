import React, { useState, useEffect } from "react";
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

const ClassroomDetailScreen = ({ navigation, route }: any) => {
  const {curClassroom} = route.params;
  console.log('curClassroom', curClassroom);
  const [className, setClassName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({
    className: "",
    loginId: "",
    password: ""
  });

  useEffect(() => {
    // 仮データを初期セット（実際は API 取得など）
    const initial = {
      className: curClassroom.name,
      loginId: curClassroom.loginId,
      password: curClassroom.password
    };
    setClassName(initial.className);
    setLoginId(initial.loginId);
    setPassword(initial.password);
    setOriginalData(initial);
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      if (className === "") return Alert.alert("クラス名を入力してください");
      if (loginId === "") return Alert.alert("ログインIDを入力してください");
      if (password === "") return Alert.alert("パスワードを入力してください");

      const response = await fetch(`${SERVER_URL}api/classrooms/${curClassroom.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: className,
          loginId: loginId,
          password: password
        }),
      });

      const data = await response.json();
      console.log('data', data);

      if (data.code == 0) {
        Alert.alert('すでに登録されている教室です。')
      } else {
        Alert.alert('正確に編集されています。');
        setOriginalData({
          className,
          loginId,
          password
        });
        setIsEditing(false);
      }
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  const handleCancel = () => {
    setClassName(originalData.className);
    setLoginId(originalData.loginId);
    setPassword(originalData.password);
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "確認",
      "本当に削除しますか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "はい",
          onPress: async () => {
            // 実際の削除APIはここに
            console.log('curClassroomId', curClassroom.id);
            const response = await fetch(`${SERVER_URL}api/classrooms/${curClassroom.id}`, {
              method: 'delete',
              headers: {
                "Content-Type": "application/json",
              }
            });
        
            const data = await response.json();
            Alert.alert('正確に削除されました。');
            console.log("data", data);
            console.log("削除処理呼び出し");
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>教室詳細</Text>
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
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ログインID登録</Text>
        <TextInput
          style={styles.input}
          value={loginId}
          onChangeText={setLoginId}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>パスワード登録</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isEditing}
          editable={isEditing}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonStyle}>
        <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
          <Text style={styles.buttonText}>{isEditing ? "保存" : "編集"}</Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "gray" }]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>キャンセル</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>消去</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default ClassroomDetailScreen;

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
  buttonStyle: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: 'center'
  },
  button: {
    marginTop: 20,
    marginRight: 10,
    backgroundColor: "#2B5DAE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
