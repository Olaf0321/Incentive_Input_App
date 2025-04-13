import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const StaffDashboardScreen = ({ navigation, route }: any) => {
  const {employee} = route.params;
  const handlePress = (period: string) => {
    navigation.navigate('インセンティブ入力', {
      employee: employee,
      status: period
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>インセンティブ入力アプリ</Text>
      <Text style={styles.subHeader}>スタッフ個別ログイン</Text>

      {/* Buttons Row */}
      <View style={styles.buttonRow}>
        {/* 上期入力 Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("上期入力")}>
            <Text style={styles.buttonText}>上期入力</Text>
          </TouchableOpacity>
          <Text style={styles.description}>上期査定入力期間は{"\n"}10,11,12,1,2,3月</Text>
        </View>

        {/* 下期入力 Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("下期入力")}>
            <Text style={styles.buttonText}>下期入力</Text>
          </TouchableOpacity>
          <Text style={styles.description}>下期査定入力期間は{"\n"}4,5,6,7,8,9月</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StaffDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  subHeader: {
    fontSize: 18,
    color: "#555",
    marginBottom: 220,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#2B5DAE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
