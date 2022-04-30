import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AddRecords from "./AllReports";
import Details from "./Details";
const ProfStack = createStackNavigator();
export default function Prof(props) {
  return (
    <ProfStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfStack.Screen name="All" component={AddRecords} />
      <ProfStack.Screen name="Details" component={Details} />
    </ProfStack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {},
});
