import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const DashboardScreen = ({ navigation }: any) => {
  const buttons = [
    { title: "エリア及び事業\n登録", screen: "AreaBusinessRegistrationScreen" },
    { title: "スタッフ登録\n社員・バイト", screen: "StaffRegistrationScreen" },
    { title: "インセンティブ項目設定", screen: "IncentiveSettingsScreen" },
    { title: "内容閲覧・全体・各教室・編集\nCSV出力", screen: "ContentViewScreen" },
    { title: "上期締め切り\n上期データクリア", screen: "FirstHalfClearScreen" },
    // { title: "下期締め切り\n下期データクリア", screen: "StaffDashboardScreen" },
    { title: "下期締め切り\n下期データクリア", screen: "SecondHalfClearScreen" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ入力アプリ</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Button Grid */}
      <View style={styles.gridContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  button: {
    width: width * 0.4, // 40% of screen width
    height: 80,
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
