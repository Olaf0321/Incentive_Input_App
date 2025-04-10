import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import SERVER_URL from "../../config"

const StaffRegistrationScreen = ({ navigation }: any) => {
  const [staffName, setStaffName] = useState("");

  const [openOfClass, setOpenOfClass] = useState(false);
  const [valueOfClass, setValueOfClass] = useState("");
  const [classId, setClassId] = useState([
    { label: "A教室", value: "option1" },
    { label: "B教室", value: "option2" },
    { label: "C教室", value: "option3" },
  ]);

  const [openOfJob, setOpenOfJob] = useState(false);
  const [valueOfJob, setValueOfJob] = useState("");
  const [jobs, setJobs] = useState([
    { label: "正社員", value: "正社員" },
    { label: "パートアルバイト", value: "パートアルバイト" }
  ]);

  const handleRegister = async () => {
    try {
      if (staffName == '') Alert.alert(`スタッフの名前を入力してください。`);
      else if (valueOfClass == "") Alert.alert(`エリア/業種を選択してください。`);
      else if (valueOfJob == "") Alert.alert(`雇用形態を選択してください。`);
      else {
        const response = await fetch(`${SERVER_URL}api/staff/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: staffName,
            type: valueOfJob,
            classroom: valueOfClass
          })
        })
        const data = await response.json();
        Alert.alert(`${data.msg}`);
        if (data.code == 1) {
          setStaffName("");
          setValueOfClass("");
          setValueOfJob("");
        }
      }
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  const getClassrooms = async () => {
    try {
      const response = await fetch(`${SERVER_URL}api/classrooms/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      let result = [];
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == 'AdminClassroom') continue;
        result.push({label: data[i].name, value: data[i]._id});
      }
      setClassId([...result]);
    } catch (err) {
      Alert.alert(`${err}`);
    }
  }

  useEffect(() => {
    getClassrooms();
  }, [])

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

      {/* Area and Business Selection */}
      <View style={styles.inputContainerRow}>
        <Text style={styles.label}>エリア・事業</Text>
        <View style={[styles.dropdownWrapper, openOfClass && { zIndex: 2000 }]}>
          <DropDownPicker
            open={openOfClass}
            value={valueOfClass}
            items={classId}
            setOpen={setOpenOfClass}
            setValue={setValueOfClass}
            setItems={setClassId}
            placeholder="教室を選択"
            style={styles.dropdown}
          />
        </View>
      </View>

      {/* Employment Type Selection */}
      <View style={styles.inputContainerRow}>
        <Text style={styles.label}>雇用形態</Text>
        <View style={[styles.dropdownWrapper, openOfJob && { zIndex: 1000 }]}>
          <DropDownPicker
            open={openOfJob}
            value={valueOfJob}
            items={jobs}
            setOpen={setOpenOfJob}
            setValue={setValueOfJob}
            setItems={setJobs}
            placeholder="ジョブを選択"
            style={styles.dropdown}
          />
        </View>
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
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    zIndex: 1000, // Ensure dropdown appears above other elements
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
  dropdownContainer: {
    flex: 1,
  },
  inputContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  dropdownWrapper: {
    flex: 1,
    zIndex: 1, // 初期値を低めにする
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
});