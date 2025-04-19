import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Import Screens
import LoginScreen from "../screens/login/LoginScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AreaBusinessRegistrationScreen from "../screens/area-registration/AreaBusinessRegistrationScreen";
import StaffRegistrationScreen from "../screens/staff-registration/StaffRegistrationScreen";
import IncentiveSettingsScreen from "../screens/incentive-setting/IncentiveSettingsScreen";
import ContentViewScreen from "../screens/content-view/ContentViewScreen";
import FirstHalfClearScreen from "../screens/first-half-clear/FirstHalfClearScreen";
import StaffDashboardScreen from "../screens/dashboard/StaffDashboardScreen";
import SecondHalfClearScreen from "../screens/second-half-clear/SecondHalfClearScreen";
import OverallReviewScreen from "../screens/content-view/OverallReviewScreen";
import ClassroomReviewScreen from "../screens/content-view/ClassroomReviewScreen";
import CSVExportScreen from "../screens/content-view/CSVExportScreen";
import DropdownScreen from "../screens/DropdownScreen";
import EmployeeDetailScreen from '../screens/content-view/EmployeeDetailScreen';
import BulkEditingScreen from '../screens/content-view/BulkEditingScreen';
import ActivityScreen from '../screens/staff-incentive-input/ActivityScreen';
import BulkEditingDetailScreen from '../screens/content-view/BulkEditingDetailScreen';
import IncentiveDetailScreeen from '../screens//content-view/IncentiveDetailScreen'

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
        <Stack.Screen name="従業員詳細" component={EmployeeDetailScreen} />
        <Stack.Screen name="インセンティブ詳細" component={IncentiveDetailScreeen} />
        <Stack.Screen name="一括編集" component={BulkEditingScreen} />
        <Stack.Screen name="一括編集詳細" component={BulkEditingDetailScreen} />
        <Stack.Screen name="CSVエクスポート" component={CSVExportScreen} />
        <Stack.Screen name="インセンティブ入力" component={ActivityScreen} />
        <Stack.Screen name="落ちる" component={DropdownScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
