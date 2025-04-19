// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert
// } from "react-native";
// import { Dropdown } from 'react-native-element-dropdown';

// import SERVER_URL from "../../../config"

// interface DropdownItem {
//   label: string;
//   value: string;
// }

// const EmployeeDetailScreen = ({ navigation, route }: any) => {
//   const { employee } = route.params;
//   console.log('employee', employee);
//   const [staffName, setStaffName] = useState(employee.name);
//   const [valueOfClass, setValueOfClass] = useState(employee.area);
//   const [classId, setClassId] = useState([
//     { label: "A教室", value: "option1" },
//     { label: "B教室", value: "option2" },
//     { label: "C教室", value: "option3" },
//   ]);

//   const [valueOfJob, setValueOfJob] = useState(employee.role);
//   const [jobs, setJobs] = useState([
//     { label: "正社員", value: "正社員" },
//     { label: "パートアルバイト", value: "パートアルバイト" }
//   ]);

//   const handleRegister = async () => {
//     try {
//       if (staffName == '') Alert.alert(`スタッフの名前を入力してください。`);
//       else if (valueOfClass == "") Alert.alert(`エリア/業種を選択してください。`);
//       else if (valueOfJob == "") Alert.alert(`雇用形態を選択してください。`);
//       else {
//         const response = await fetch(`${SERVER_URL}api/staff/`, {
//           method: 'POST',
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             name: staffName,
//             type: valueOfJob,
//             classroom: valueOfClass
//           })
//         })
//         const data = await response.json();
//         Alert.alert(`${data.msg}`);
//         if (data.code == 1) {
//           setStaffName("");
//           setValueOfClass("");
//           setValueOfJob("");
//         }
//       }
//     } catch (err) {
//       Alert.alert(`error: ${err}`);
//     }
//   };

//   const getClassrooms = async () => {
//     try {
//       const response = await fetch(`${SERVER_URL}api/classrooms/`, {
//         method: 'GET',
//         headers: {
//           "Content-Type": "application/json",
//         }
//       });
//       let result = [];
//       const data = await response.json();
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].name == 'AdminClassroom') continue;
//         result.push({ label: data[i].name, value: data[i].name });
//       }
//       setClassId([...result]);
//     } catch (err) {
//       Alert.alert(`${err}`);
//     }
//   }

//   useEffect(() => {
//     getClassrooms();
//   }, [])

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>スタッフ登録</Text>
//         <Text style={styles.subtitle}>マスタ</Text>
//       </View>

//       {/* Input Fields */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>スタッフ名登録</Text>
//         <TextInput
//           style={styles.input}
//           value={staffName}
//           onChangeText={setStaffName}
//         />
//       </View>

//       {/* Area and Business Selection */}
//       <View style={styles.inputContainerRow}>
//         <Text style={styles.label}>エリア・事業</Text>
//         <Dropdown
//           style={styles.dropdown}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           data={classId}
//           maxHeight={300}
//           labelField='label'
//           valueField='value'
//           placeholder="地域を選択してください。"
//           value={valueOfClass}
//           onChange={(item: DropdownItem) => setValueOfClass(item.value)}
//         />
//       </View>

//       {/* Employment Type Selection */}
//       <View style={styles.inputContainerRow}>
//         <Text style={styles.label}>雇用形態</Text>
//         <Dropdown
//           style={styles.dropdown}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           data={jobs}
//           maxHeight={300}
//           labelField='label'
//           valueField='value'
//           placeholder="地域を選択してください。"
//           value={valueOfJob}
//           onChange={(item: DropdownItem) => setValueOfJob(item.value)}
//         />
//       </View>

//       <View style={styles.buttonStyle}>
//         {/* Edit Button */}
//         <TouchableOpacity style={styles.button} onPress={handleRegister}>
//           <Text style={styles.buttonText}>編集</Text>
//         </TouchableOpacity>

//         {/* Delete Button */}
//         <TouchableOpacity style={styles.DeleteButton} onPress={handleRegister}>
//           <Text style={styles.buttonText}>消去</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default EmployeeDetailScreen;

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
//     alignItems: "center",
//     marginBottom: 40,
//     width: "100%",
//   },
//   rowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 20,
//     zIndex: 1000, // Ensure dropdown appears above other elements
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
//     marginLeft: 10
//   },
//   DeleteButton: {
//     marginTop: 20,
//     backgroundColor: "red",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     marginLeft: 10
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//   },
//   dropdownContainer: {
//     flex: 1,
//   },
//   inputContainerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 40,
//     width: "100%",
//   },
//   dropdownWrapper: {
//     flex: 1,
//     zIndex: 1, // 初期値を低めにする
//   },
//   dropdown: {
//     height: 30,
//     width: '65%',
//     borderBottomColor: 'gray',
//     borderBottomWidth: 0.5,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   buttonStyle: {
//     flexDirection: "row",
//   }
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  BackHandler
} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

import SERVER_URL from "../../../config"

interface DropdownItem {
  label: string;
  value: string;
}

const EmployeeDetailScreen = ({ navigation, route }: any) => {
  const { employee } = route.params;
  const [staffName, setStaffName] = useState(employee.name);
  const [valueOfClass, setValueOfClass] = useState(employee.area);
  const [valueOfJob, setValueOfJob] = useState(employee.role);

  const [originalName, setOriginalName] = useState(employee.name);
  const [originalClass, setOriginalClass] = useState(employee.area);
  const [originalJob, setOriginalJob] = useState(employee.role);

  const [isEditing, setIsEditing] = useState(false);

  const [classId, setClassId] = useState<DropdownItem[]>([
    { label: "A教室", value: "option1" },
    { label: "B教室", value: "option2" },
    { label: "C教室", value: "option3" },
  ]);

  const [jobs, setJobs] = useState([
    { label: "正社員", value: "正社員" },
    { label: "パートアルバイト", value: "パートアルバイト" }
  ]);

  const saveEdits = async () => {
    const response = await fetch(`${SERVER_URL}api/staff/${employee.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: staffName,
        classroomName: valueOfClass,
        type: valueOfJob
      })
    });

    const data = await response.json();
    console.log("data", data);

    if (data.code == 0) {
      Alert.alert(`すでに使用されている名前です。`);
    } else {
      Alert.alert(`正確に編集されています。`);
      // 保存処理（空関数）
      console.log("保存処理呼び出し");
      setOriginalName(staffName);
      setOriginalClass(valueOfClass);
      setOriginalJob(valueOfJob);
      setIsEditing(false);
    }
  };

  const cancelEdits = () => {
    setStaffName(originalName);
    setValueOfClass(originalClass);
    setValueOfJob(originalJob);
    setIsEditing(false);
  };

  const deleteEmployee = async () => {
    // 削除処理（空関数）
    const response = await fetch(`${SERVER_URL}api/staff/${employee.id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    Alert.alert('正確に削除されました。');
    console.log("data", data);
    console.log("削除処理呼び出し");
  };

  const confirmDelete = () => {
    Alert.alert(
      "確認",
      "本当に削除しますか？",
      [
        { text: "いいえ", style: "cancel" },
        { text: "はい", onPress: deleteEmployee }
      ],
      { cancelable: true }
    );
  };

  const getClassrooms = async () => {
    try {
      const response = await fetch(`${SERVER_URL}api/classrooms/`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      const result = data
        .filter((item: any) => item.name !== 'AdminClassroom')
        .map((item: any) => ({ label: item.name, value: item.name }));
      setClassId(result);
    } catch (err) {
      Alert.alert(`${err}`);
    }
  }

  useEffect(() => {
    getClassrooms();
  }, []);

  useEffect(() => {
    const backAction = () => {
      // Optional custom logic before going back
      navigation.goBack(); // Render the previous screen
      return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>スタッフ登録</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>スタッフ名登録</Text>
        <TextInput
          style={styles.input}
          value={staffName}
          onChangeText={setStaffName}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainerRow}>
        <Text style={styles.label}>エリア・事業</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={classId}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder="地域を選択してください。"
          value={valueOfClass}
          onChange={(item: DropdownItem) => setValueOfClass(item.value)}
          disable={!isEditing}
        />
      </View>

      <View style={styles.inputContainerRow}>
        <Text style={styles.label}>雇用形態</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={jobs}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder="雇用形態を選択してください。"
          value={valueOfJob}
          onChange={(item: DropdownItem) => setValueOfJob(item.value)}
          disable={!isEditing}
        />
      </View>

      <View style={styles.buttonStyle}>
        {!isEditing ? (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>編集</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={saveEdits}>
              <Text style={styles.buttonText}>保存</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEdits}>
              <Text style={styles.buttonText}>キャンセル</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.DeleteButton} onPress={confirmDelete}>
          <Text style={styles.buttonText}>消去</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeDetailScreen;

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
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  inputContainerRow: {
    flexDirection: "row",
    alignItems: "center",
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
  dropdown: {
    height: 30,
    width: '65%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  buttonStyle: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2B5DAE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#888",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  DeleteButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
