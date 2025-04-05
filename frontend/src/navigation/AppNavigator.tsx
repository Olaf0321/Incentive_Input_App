import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Import Screens
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AreaBusinessRegistrationScreen from "../screens/AreaBusinessRegistrationScreen";
import StaffRegistrationScreen from "../screens/StaffRegistrationScreen";
import IncentiveSettingsScreen from "../screens/IncentiveSettingsScreen";
import ContentViewScreen from "../screens/ContentViewScreen";
import FirstHalfClearScreen from "../screens/FirstHalfClearScreen";
import StaffDashboardScreen from "../screens/StaffDashboardScreen";
import SecondHalfClearScreen from "../screens/SecondHalfClearScreen";
import OverallReviewScreen from "../screens/OverallReviewScreen";
import ClassroomReviewScreen from "../screens/ClassroomReviewScreen";
import CSVExportScreen from "../screens/CSVExportScreen";
import DropdownScreen from "../screens/DropdownScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ログイン">
        <Stack.Screen name="ログイン" component={LoginScreen} />
        <Stack.Screen name="ダッシュボード" component={DashboardScreen} />
        <Stack.Screen name="エリアビジネス登録" component={AreaBusinessRegistrationScreen} />
        <Stack.Screen name="スタッフ登録" component={StaffRegistrationScreen} />
        <Stack.Screen name="インセンティブ設定" component={IncentiveSettingsScreen} />
        <Stack.Screen name="コンテンツビュー" component={ContentViewScreen} />
        <Stack.Screen name="前半クリア" component={FirstHalfClearScreen} />
        <Stack.Screen name="スタッフダッシュボード" component={StaffDashboardScreen} />
        <Stack.Screen name="後半クリア" component={SecondHalfClearScreen} />
        <Stack.Screen name="全体的なレビュー" component={OverallReviewScreen} />
        <Stack.Screen name="教室レビュー" component={ClassroomReviewScreen} />
        <Stack.Screen name="CSVエクスポート" component={CSVExportScreen} />
        <Stack.Screen name="落ちる" component={DropdownScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
