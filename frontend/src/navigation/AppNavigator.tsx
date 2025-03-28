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
// import SettingsScreen from "../screens/SettingsScreen";

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
        {/* <Stack.Screen name="CSVExport" component={CSVExportScreen} /> */}
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
