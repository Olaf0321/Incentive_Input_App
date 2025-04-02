import React, { useState } from "react";
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

const IncentiveSettingsScreen = ({ navigation }: any) => {
  const [salaryItem, setSalaryItem] = useState("");

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

  const handleRegister = () => {
    if (!salaryItem) {
      Alert.alert("給与項目名を入力してください。");
      return;
    }
    if (!valueOfPrice) {
      Alert.alert("単価を選択してください。");
      return;
    }
    if (!valueOfRating) {
      Alert.alert("等級を選択してください。");
      return;
    }
    console.log("Registering with:", { salaryItem, valueOfPrice, valueOfRating });
  };

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
  },
});
