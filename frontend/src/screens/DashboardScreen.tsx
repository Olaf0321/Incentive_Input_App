import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const DashboardScreen = ({ navigation }: any) => {
  const buttons = [
    { title: "エリア及び事業\n登録", screen: "エリアビジネス登録" },
    { title: "スタッフ登録\n社員・バイト", screen: "スタッフ登録" },
    // { title: "スタッフ登録\n社員・バイト", screen: "DropdownScreen" },
    { title: "インセンティブ項目設定", screen: "インセンティブ設定" },
    { title: "内容閲覧・全体・各教室・編集\nCSV出力", screen: "コンテンツビュー" },
    { title: "上期締め切り\n上期データクリア", screen: "前半クリア" },
    // { title: "下期締め切り\n下期データクリア", screen: "StaffDashboardScreen" },
    { title: "下期締め切り\n下期データクリア", screen: "後半クリア" },
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
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
    marginBottom: 100
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
