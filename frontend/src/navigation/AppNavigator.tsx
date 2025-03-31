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
// import StaffDashboardScreen from "../screens/StaffDashboardScreen";
import SecondHalfClearScreen from "../screens/SecondHalfClearScreen";
import OverallReviewScreen from "../screens/OverallReviewScreen";
import ClassroomReviewScreen from "../screens/ClassroomReviewScreen";
import CSVExportScreen from "../screens/CSVExportScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="AreaBusinessRegistrationScreen" component={AreaBusinessRegistrationScreen} />
        <Stack.Screen name="StaffRegistrationScreen" component={StaffRegistrationScreen} />
        <Stack.Screen name="IncentiveSettingsScreen" component={IncentiveSettingsScreen} />
        <Stack.Screen name="ContentViewScreen" component={ContentViewScreen} />
        <Stack.Screen name="FirstHalfClearScreen" component={FirstHalfClearScreen} />
        {/* <Stack.Screen name="StaffDashboardScreen" component={StaffDashboardScreen} /> */}
        <Stack.Screen name="SecondHalfClearScreen" component={SecondHalfClearScreen} />
        <Stack.Screen name="OverallReviewScreen" component={OverallReviewScreen} />
        <Stack.Screen name="ClassroomReviewScreen" component={ClassroomReviewScreen} />
        <Stack.Screen name="CSVExportScreen" component={CSVExportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
