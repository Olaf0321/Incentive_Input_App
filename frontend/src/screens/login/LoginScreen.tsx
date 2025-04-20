// import React, { useState } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity, StyleSheet,
//   Alert, Dimensions, SafeAreaView
// } from "react-native";

// import SERVER_URL from "../../../config"

// const { width, height } = Dimensions.get("window");

// const LoginScreen = ({ navigation }: any) => {
//   const [name, setName] = useState("");
//   const [loginId, setLoginId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`${SERVER_URL}api/auth/login`, {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: name,
//           loginId: loginId,
//           password: password
//         })
//       })

//       const data = await response.json();
//       console.log("data", data);

//       if (data.code != 3) Alert.alert(`${data.msg}`);
//       else {
//         if (data.check) navigation.navigate('ダッシュボード');
//         else navigation.navigate('スタッフダッシュボード', {
//           employee: {
//             name: name
//           }
//         })
//       }
//       // navigation.navigate('ダッシュボード');

//     } catch (err) {
//       Alert.alert(`${err}`)
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>インセンティブ入力アプリ</Text>
//         <Text style={styles.subtitle}>マスタ</Text>
//       </View>

//       {/* Login Interface */}
//       <View style={styles.bottomContainer}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>名前</Text>
//           <TextInput
//             style={styles.input}
//             value={name}
//             onChangeText={setName}
//             placeholder=""
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>ログインID</Text>
//           <TextInput
//             style={styles.input}
//             value={loginId}
//             onChangeText={setLoginId}
//             placeholder=""
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>パスワード</Text>
//           <TextInput
//             style={styles.input}
//             value={password}
//             onChangeText={setPassword}
//             placeholder=""
//             secureTextEntry
//           />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>ログイン</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     width: width,
//     justifyContent: "space-between",
//   },
//   header: {
//     width: "100%",
//     height: 100,
//     justifyContent: "center",
//     alignItems: "center",
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
//   bottomContainer: {
//     width: "100%", // Ensure full width
//     paddingHorizontal: 20, // Equal margins on left and right
//     marginBottom: 280,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     marginBottom: 30,
//   },
//   label: {
//     fontSize: 16,
//     width: 100,
//     marginRight: 10,
//     textAlign: "right",
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderBottomWidth: 2,
//     borderBottomColor: "#000",
//     fontSize: 16,
//     paddingHorizontal: 5,
//     paddingBottom: 5,
//   },
//   button: {
//     marginTop: 50,
//     width: "100%", // Ensures equal left and right spacing
//     alignItems: "center", // Centers text inside button
//   },
//   buttonText: {
//     backgroundColor: "#2B5DAE",
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingVertical: 12,
//     paddingHorizontal: 60,
//     borderRadius: 8,
//   },
// });

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
