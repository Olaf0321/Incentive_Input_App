// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert
// } from "react-native";
// import SERVER_URL from "../../../config";

// const ClassroomDetailScreen = ({ navigation }: any) => {
//   const [className, setClassName] = useState("");
//   const [loginId, setLoginId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     try {
//       if (className == "") Alert.alert("クラス名を入力してください");
//       else if (loginId == "") Alert.alert("ログインIDを入力してください");
//       else if (password == "") Alert.alert("パスワードを入力してください");
//       else {
//         const response = await fetch(`${SERVER_URL}api/classrooms/`, {
//           method: 'POST',
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: className,
//             loginId: loginId,
//             password: password
//           })
//         })
//         const data = await response.json();
//         Alert.alert(`${data.msg}`);
//         if (data.code == 1) {
//           setClassName("");
//           setLoginId("");
//           setPassword("");
//         }
//       }

//     } catch (err) {
//       Alert.alert(`error: ${err}`);
//     }

//     // Handle registration logic
//     console.log("Registered:", { className, loginId, password });

//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>教室登録</Text>
//         <Text style={styles.subtitle}>マスタ</Text>
//       </View>

//       {/* Input Fields */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>教室名登録</Text>
//         <TextInput
//           style={styles.input}
//           value={className}
//           onChangeText={setClassName}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>ログインID登録</Text>
//         <TextInput
//           style={styles.input}
//           value={loginId}
//           onChangeText={setLoginId}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>パスワード登録</Text>
//         <TextInput
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//       </View>

//       {/* Register Button */}
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>登録ボタン</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default ClassroomDetailScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     padding: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 120,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#555",
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     marginBottom: 40,
//     width: "100%",
//   },
//   label: {
//     fontSize: 16,
//     width: 120,
//   },
//   input: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     fontSize: 16,
//     padding: 5,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#2B5DAE",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import SERVER_URL from "../../../config";

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>教室詳細</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Input Fields */}
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
      <View style={{ flexDirection: "row" }}>
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
    </SafeAreaView>
  );
};

export default ClassroomDetailScreen;

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
