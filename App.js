import "react-native-gesture-handler";
import react, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, LogBox } from "react-native";
import Main from "./Main";
LogBox.ignoreAllLogs();
export default function App() {
  return <Main />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
