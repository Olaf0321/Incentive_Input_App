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

const { width } = Dimensions.get("window");

interface DropdownItem {
  label: string;
  value: any;
}

const IncentiveSettingsScreen = ({ navigation }: any) => {
  const [salaryItem, setSalaryItem] = useState("");

  const [valueOfType, setValueOfType] = useState("");
  const [types, setTypes] = useState([
    { label: "正社員用", value: "正社員用" },
    { label: "パートアルバイト用", value: "パートアルバイト用" },
  ]);

  const [valueOfPrice, setValueOfPrice] = useState("");
  const [prices, setPrices] = useState<DropdownItem[]>([]);

  const [valueOfRating, setValueOfRating] = useState("");
  const [ratings, setRatings] = useState<DropdownItem[]>([]);

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
          setValueOfType("");
          setValueOfPrice("");
          setValueOfRating("");
        }
      }
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  useEffect(() => {
    let arr: DropdownItem[] = [];
    for (let i = 100; i <= 10000; i += 100) {
      arr.push({ label: String(i), value: i });
    }
    setPrices([...arr]);

    arr = [];
    for (let i = 1; i <= 20; i++) {
      arr.push({ label: String(i), value: i });
    }
    for (let i = 30; i <= 200; i += 10) {
      arr.push({ label: String(i), value: i });
    }
    setRatings([...arr]);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ　項目設定</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>給与項目名登録</Text>
          <TextInput
            style={styles.input}
            value={salaryItem}
            onChangeText={setSalaryItem}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>形態</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={types}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder="形態を選択してください。"
            value={valueOfType}
            onChange={(item: DropdownItem) => setValueOfType(item.value)}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>単価登録</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={prices}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder="単価を選択してください。"
            value={valueOfPrice}
            onChange={(item: DropdownItem) => setValueOfPrice(item.value)}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>等級登録</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={ratings}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder="等級を選択してください。"
            value={valueOfRating}
            onChange={(item: DropdownItem) => setValueOfRating(item.value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>登録ボタン</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IncentiveSettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
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
    // paddingTop: 120,
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