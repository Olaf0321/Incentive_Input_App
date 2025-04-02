import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const ContentReviewScreen = ({ navigation }: any) => {
  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
      <Text style={styles.subtitle}>マスタ</Text>

      {/* Button Grid */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress("OverallReviewScreen")}>
          <Text style={styles.buttonText}>内容閲覧全体</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("ClassroomReviewScreen")}>
          <Text style={styles.buttonText}>各教室ごと閲覧</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("BulkEditScreen")}>
          <Text style={styles.buttonText}>一括編集</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("CSVExportScreen")}>
          <Text style={styles.buttonText}>CSV出力</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContentReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
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
    marginBottom: 120,
  },
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distributes buttons evenly
    paddingHorizontal: 10,
  },
  button: {
    width: "48%", // Ensures two buttons per row
    height: 50,
    backgroundColor: "#2B5DAE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30, // Adds spacing between rows
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
