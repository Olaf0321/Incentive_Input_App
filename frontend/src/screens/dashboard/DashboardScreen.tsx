// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const DashboardScreen = ({ navigation }: any) => {
//   const buttons = [
//     { title: "エリア及び事業\n登録", screen: "エリアビジネス登録" },
//     { title: "スタッフ登録\n社員・バイト", screen: "スタッフ登録" },
//     { title: "インセンティブ項目設定", screen: "インセンティブ設定" },
//     { title: "内容閲覧・全体・各教室・編集\nCSV出力", screen: "コンテンツビュー" },
//     { title: "上期締め切り\n上期データクリア", screen: "前半クリア" },
//     { title: "下期締め切り\n下期データクリア", screen: "後半クリア" },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>インセンティブ入力アプリ</Text>
//         <Text style={styles.subtitle}>マスタ</Text>
//       </View>

//       {/* Button Grid */}
//       <View style={styles.gridContainer}>
//         {buttons.map((btn, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.button}
//             onPress={() => navigation.navigate(btn.screen)}
//           >
//             <Text style={styles.buttonText}>{btn.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default DashboardScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     padding: 20,
//   },
//   header: {
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#555",
//     marginTop: 5,
//     marginBottom: 100
//   },
//   gridContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: 15,
//   },
//   button: {
//     width: width * 0.4, // 40% of screen width
//     height: 120,
//     backgroundColor: "#2B5DAE",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 30
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });


import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

const DashboardScreen = ({ navigation }: any) => {
  const buttons = [
    { title: "エリア及び事業\n登録", screen: "エリアビジネス登録" },
    { title: "スタッフ登録\n社員・バイト", screen: "スタッフ登録" },
    { title: "インセンティブ項目設定", screen: "インセンティブ設定" },
    { title: "内容閲覧・全体・各教室・編集\nCSV出力", screen: "コンテンツビュー" },
    { title: "上期締め切り\n上期データクリア", screen: "前半クリア" },
    { title: "下期締め切り\n下期データクリア", screen: "後半クリア" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>インセンティブ入力アプリ</Text>
        <Text style={styles.subtitle}>マスタ</Text>
      </View>
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
    </SafeAreaView>
  );
};

export default DashboardScreen;

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
  scrollContainer: {
    paddingVertical: 30,
    paddingHorizontal: width * 0.05,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
  button: {
    width: "47%",
    height: height * 0.15,
    backgroundColor: "#2B5DAE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    textAlign: "center",
    fontWeight: "bold",
  },
});
