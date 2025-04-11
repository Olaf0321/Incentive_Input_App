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
import SERVER_URL from "../../../config";
// DropDownPicker.setListMode("MODAL")

const IncentiveSettingsScreen = ({ navigation }: any) => {
  const [salaryItem, setSalaryItem] = useState("");

  const [openOfType, setOpenOfType] = useState(false);
  const [valueOfType, setValueOfType] = useState(null);
  const [types, setTypes] = useState([
    { label: "正社員用", value: "正社員用" },
    { label: "パートアルバイト用", value: "パートアルバイト用" },
  ]);

  const [openOfPrice, setOpenOfPrice] = useState(false);
  const [valueOfPrice, setValueOfPrice] = useState(null);
  const [prices, setPrices] = useState([
    { label: "100", value: 100 },
    { label: "200", value: 200 },
    { label: "300", value: 300 },
  ]);

  const [openOfRating, setOpenOfRating] = useState(false);
  const [valueOfRating, setValueOfRating] = useState(null);
  const [ratings, setRatings] = useState([
    { label: "100", value: 100 },
    { label: "200", value: 200 },
    { label: "300", value: 300 },
  ]);

  const handleRegister = async () => {
    try {
      if (!salaryItem) Alert.alert("給与項目名を入力してください。");
      else if (!valueOfType) Alert.alert("形態を入力してください。");
      else if (!valueOfPrice) Alert.alert("単価を選択してください。");
      else if (!valueOfRating) Alert.alert("等級を選択してください。");
      else {
        const response = await fetch(`${SERVER_URL}api/incentive/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify ({
            name: salaryItem,
            type: valueOfType,
            unit_price: valueOfPrice,
            upper_limit: valueOfRating
          })
        });
        const data = await response.json();
        Alert.alert(`${data.msg}`);
        if (data.code == 1) {
          setSalaryItem("");
          setValueOfPrice(null);
          setValueOfRating(null);
        }
      }
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  useEffect(()=> {
    let arr = [];
    for (let i = 100; i <= 10000; i += 100) {
      arr.push({label: String(i), value: i});
    }
    setPrices([...arr]);

    arr = [];
    for (let i = 1; i <= 20; i++) {
      arr.push({label: String(i), value: i});
    }
    for (let i = 30; i <= 200; i+=10) {
      arr.push({label: String(i), value: i});
    }
    setRatings([...arr]);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ　項目設定</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>給与項目名登録</Text>
        <TextInput
          style={styles.input}
          value={salaryItem}
          onChangeText={setSalaryItem}
        />
      </View>

      {/* Area and Business Selection */}
      <View style={styles.inputContainerRow}>
        <Text style={styles.label}>形態</Text>
        <View style={[styles.dropdownWrapper, openOfType && { zIndex: 2000 }]}>
          <DropDownPicker
            open={openOfType}
            value={valueOfType}
            items={types}
            setOpen={setOpenOfType}
            setValue={setValueOfType}
            setItems={setTypes}
            placeholder="単価をお選びください。"
            style={styles.dropdown}
          />
        </View>
      </View>

      {/* Area and Business Selection */}
      <View style={styles.inputContainerRow}>
        <Text style={styles.label}>単価登録</Text>
        <View style={[styles.dropdownWrapper, openOfPrice && { zIndex: 2000 }]}>
          <DropDownPicker
            open={openOfPrice}
            value={valueOfPrice}
            items={prices}
            setOpen={setOpenOfPrice}
            setValue={setValueOfPrice}
            setItems={setPrices}
            placeholder="単価をお選びください。"
            style={styles.dropdown}
            maxHeight={200} // This limits the dropdown height to 300, making it scrollable
            searchable = {true}
            searchPlaceholder="Search"
            autoScroll={true}
          />
        </View>
      </View>

      <View style={styles.inputContainerRow}>
        <Text style={styles.label}>等級登録</Text>
        <View style={[styles.dropdownWrapper, openOfRating && { zIndex: 2000 }]}>
          <DropDownPicker
            open={openOfRating}
            value={valueOfRating}
            items={ratings}
            setOpen={setOpenOfRating}
            setValue={setValueOfRating}
            setItems={setRatings}
            placeholder="等級をお選びください。"
            style={styles.dropdown}
            maxHeight={200} // This limits the dropdown height to 300, making it scrollable
            searchable = {true}
            searchPlaceholder="Search"
            autoScroll={true}
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

export default IncentiveSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 100,
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
  inputContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  label: {
    fontSize: 16,
    width: 120, // Adjusted for alignment
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
  dropdownWrapper: {
    flex: 1,
    zIndex: 1, // 初期値を低めにする
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  }
});
