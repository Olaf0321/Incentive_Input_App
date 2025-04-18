import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import FirstHalfExcelOutput from '../../components/FirstHalfExcelOutput'
import SERVER_URL from "../../../config";

const { width } = Dimensions.get("window");

const CSVExportScreen = ({ navigation }: any) => {
  const buttons = [
    { title: "上期一括\nCSV出力", content: "FirstHalfCSVOutputScreen" },
    { title: "下期一括\nCSV出力", content: "SecondHalfCSVOutputScreen" },
    { title: "上期エリア、\n事業ごと\nCSV出力", content: "FirstHalfAreaCSVOutputScreen" },
    { title: "下期エリア、\n事業ごと\nCSV出力", content: "SecondHalfAreaCSVOutputScreen" },
    { title: "上期個別\nCSV出力", content: "FirstHalfIndividualCSVOutputScreen" },
    { title: "下期個別\nCSV出力", content: "SecondHalfIndividualCSVOutputScreen" },
  ];

  const handleExcelFile = async (ele: any) => {
    try {
      const response = await fetch(`${SERVER_URL}api/excel-output`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: ele.title
        })
      });

      const data = await response.json();
      if (ele.content == 'FirstHalfCSVOutputScreen') {
        FirstHalfExcelOutput(data.regularData, data.partTimeData, data.title);
      }
      Alert.alert(`${ele.content}`);
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
      <Text style={styles.subtitle}>CSV出力</Text>


      {/* Button Grid */}
      <View style={styles.gridContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            // onPress={() => navigation.navigate(btn.screen)}
            onPress={() => handleExcelFile(btn)}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CSVExportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 100,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  button: {
    width: width * 0.4, // 40% of screen width
    height: 120,
    backgroundColor: "#2B5DAE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
