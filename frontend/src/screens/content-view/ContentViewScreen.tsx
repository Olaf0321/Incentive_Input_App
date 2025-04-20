// import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ContentReviewScreen = ({ navigation }: any) => {
  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>

      {/* Button Grid */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress("全体的なレビュー")}>
          <Text style={styles.buttonText}>内容閲覧全体</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("教室レビュー")}>
          <Text style={styles.buttonText}>各教室ごと閲覧</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("一括編集")}>
          <Text style={styles.buttonText}>一括編集</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("CSVエクスポート")}>
          <Text style={styles.buttonText}>CSV出力</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContentReviewScreen;

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
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    height: width * 0.3,
    backgroundColor: "#2B5DAE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: width * 0.08,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
    textAlign: "center",
  },
});
