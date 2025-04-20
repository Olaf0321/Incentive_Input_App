import React, { useEffect, useState } from "react";
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
import { Dropdown } from 'react-native-element-dropdown';

import SERVER_URL from "../../../config"

const { width } = Dimensions.get("window");

interface DropdownItem {
  label: string;
  value: string;
}

const IncentiveDetailScreen = ({ navigation, route }: any) => {
  const { curIncentive } = route.params;
  console.log('curIncentive', curIncentive);
  const [salaryItem, setSalaryItem] = useState(curIncentive.name);
  const [valueOfType, setValueOfType] = useState(curIncentive.type);
  const [valueOfPrice, setValueOfPrice] = useState(curIncentive.unit_price);
  const [valueOfRating, setValueOfRating] = useState(curIncentive.upper_limit);

  const [types] = useState([
    { label: "正社員用", value: "正社員用" },
    { label: "パートアルバイト用", value: "パートアルバイト用" },
  ]);
  const [prices, setPrices] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState<any>({
    salaryItem: "",
    valueOfType: "",
    valueOfPrice: "",
    valueOfRating: "",
  });

  useEffect(() => {
    let priceArr = [];
    for (let i = 100; i <= 10000; i += 100) {
      priceArr.push({ label: String(i), value: i });
    }
    setPrices(priceArr);

    let ratingArr = [];
    for (let i = 1; i <= 20; i++) {
      ratingArr.push({ label: String(i), value: i });
    }
    for (let i = 30; i <= 200; i += 10) {
      ratingArr.push({ label: String(i), value: i });
    }
    setRatings(ratingArr);

    // 保存用の初期値
    setOriginalData({
      salaryItem: curIncentive.name,
      valueOfType: curIncentive.type,
      valueOfPrice: curIncentive.unit_price,
      valueOfRating: curIncentive.upper_limit,
    });
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave(); // Save when "保存"
    } else {
      setIsEditing(true); // Enable editing
    }
  };

  const handleSave = async () => {
    // ここに保存処理を追加する（仮の関数）
    const response = await fetch(`${SERVER_URL}api/incentive/${curIncentive.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: salaryItem,
        type: valueOfType,
        unit_price: valueOfPrice,
        upper_limit: valueOfRating
      })
    });

    const data = await response.json();
    console.log('data', data);

    if (data.code == 0) {
      Alert.alert('すでに登録されているインセンティブです。')
    } else {
      Alert.alert('正確に編集されています。');
      console.log("保存しました");
      setOriginalData({
        salaryItem,
        valueOfType,
        valueOfPrice,
        valueOfRating,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setSalaryItem(originalData.salaryItem);
    setValueOfType(originalData.valueOfType);
    setValueOfPrice(originalData.valueOfPrice);
    setValueOfRating(originalData.valueOfRating);
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
            // 削除処理をここに追加（仮の関数）
            const response = await fetch(`${SERVER_URL}api/incentive/${curIncentive.id}`, {
              method: 'delete',
              headers: {
                "Content-Type": "application/json",
              }
            });

            const data = await response.json();
            Alert.alert('正確に削除されました。');
            console.log("data", data);
            console.log("削除処理呼び出し");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ詳細</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Input Fields */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>給与項目名登録</Text>
          <TextInput
            style={styles.input}
            value={salaryItem}
            onChangeText={setSalaryItem}
            editable={isEditing}
          />
        </View>

        {/* Type Dropdown */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>形態</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={types}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="形態を選択してください。"
            value={valueOfType}
            onChange={(item: DropdownItem) => setValueOfType(item.value)}
            disable={!isEditing}
          />
        </View>

        {/* Price Dropdown */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>単価登録</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={prices}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="単価を選択してください。"
            value={valueOfPrice}
            onChange={(item: DropdownItem) => setValueOfPrice(item.value)}
            disable={!isEditing}
          />
        </View>

        {/* Rating Dropdown */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>等級登録</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={ratings}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="等級を選択してください。"
            value={valueOfRating}
            onChange={(item: DropdownItem) => setValueOfRating(item.value)}
            disable={!isEditing}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonStyle}>
          <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
            <Text style={styles.buttonText}>{isEditing ? "保存" : "編集"}</Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]} onPress={handleCancel}>
              <Text style={styles.buttonText}>キャンセル</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={handleDelete}>
            <Text style={styles.buttonText}>消去</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IncentiveDetailScreen;

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
  buttonStyle: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: 'center'
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
