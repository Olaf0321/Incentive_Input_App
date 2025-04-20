import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const StaffDashboardScreen = ({ navigation, route }: any) => {
  const {employee} = route.params;
  const handlePress = (period: string) => {
    navigation.navigate('インセンティブ入力', {
      employee: employee,
      status: period
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ入力アプリ</Text>
        <Text style={styles.subtitle}>スタッフ</Text>
      </View>

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
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
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
