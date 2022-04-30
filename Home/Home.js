import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./HomeScreen";
import Profile from "./Prof";
import AllReports from "./Add";
import AddRecords from "./AddRecords";
import LogOut from "./LogOut";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="HomeScreen">
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="AllReports" component={AllReports} />

      <Drawer.Screen name="Add Record" component={AddRecords} />

      <Drawer.Screen name="LogOut" component={LogOut} />
    </Drawer.Navigator>
  );
}
