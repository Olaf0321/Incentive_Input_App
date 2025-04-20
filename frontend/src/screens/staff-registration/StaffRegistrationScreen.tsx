import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import SERVER_URL from "../../../config";

const { width, height } = Dimensions.get("window");

interface DropdownItem {
  label: string;
  value: string;
}

const StaffRegistrationScreen = ({ navigation }: any) => {
  const [staffName, setStaffName] = useState("");

  const [valueOfClass, setValueOfClass] = useState("");
  const [classId, setClassId] = useState<DropdownItem[]>([]);

  const [valueOfJob, setValueOfJob] = useState("");
  const [jobs] = useState([
    { label: "正社員", value: "正社員" },
    { label: "パートアルバイト", value: "パートアルバイト" },
  ]);

  const handleRegister = async () => {
    try {
      if (!staffName) Alert.alert("スタッフの名前を入力してください。");
      else if (!valueOfClass) Alert.alert("エリア/業種を選択してください。");
      else if (!valueOfJob) Alert.alert("雇用形態を選択してください。");
      else {
        const response = await fetch(`${SERVER_URL}api/staff/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: staffName,
            type: valueOfJob,
            classroom: valueOfClass,
          }),
        });
        const data = await response.json();
        Alert.alert(`${data.msg}`);
        if (data.code === 1) {
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
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const filtered = data
        .filter((item: any) => item.name !== "AdminClassroom")
        .map((item: any) => ({ label: item.name, value: item._id }));
      setClassId(filtered);
    } catch (err) {
      Alert.alert(`${err}`);
    }
  };

  useEffect(() => {
    getClassrooms();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>スタッフ登録</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Staff Name */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>スタッフ名登録</Text>
          <TextInput
            style={styles.input}
            value={staffName}
            onChangeText={setStaffName}
          />
        </View>

        {/* Area Dropdown */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>エリア・事業</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={classId}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="地域を選択してください。"
            value={valueOfClass}
            onChange={(item: DropdownItem) => setValueOfClass(item.value)}
          />
        </View>

        {/* Job Type Dropdown */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>雇用形態</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={jobs}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="タイプを選択してください。"
            value={valueOfJob}
            onChange={(item: DropdownItem) => setValueOfJob(item.value)}
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

export default StaffRegistrationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    paddingBottom: 40,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    zIndex: 10,
  },
  label: {
    width: "35%",
    fontSize: width * 0.04,
    textAlign: "center"
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
  dropdown: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: "#000",
  },
  placeholderStyle: {
    fontSize: width * 0.04,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: width * 0.04,
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
