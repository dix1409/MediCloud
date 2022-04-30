import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import Profile from "./Profile";
import SeeProf from "./Profile/SeeProf";
const ProfStack = createStackNavigator();
import { navigationRef } from "../Nav/RootNavigation";
import * as RootNavigation from "../Nav/RootNavigation";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import Edit from "./Edit";

export default function Prof(props) {
  useEffect(() => {
    const data = async () => {
      const isAvaliable = await getDoc(
        doc(
          db,
          `user/${auth.currentUser.phoneNumber.substring(
            3,
            auth.currentUser.phoneNumber.length
          )}/Profile/${auth.currentUser.phoneNumber}`
        )
      );
      console.log(isAvaliable.exists());
      if (isAvaliable.exists()) {
        RootNavigation.navigate("SeeProf");
      } else {
        RootNavigation.navigate("Profile");
      }
    };
    data();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} independent>
      <ProfStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfStack.Screen name="Profile" component={Profile} />
        <ProfStack.Screen name="SeeProf" component={SeeProf} />
        <ProfStack.Screen name="Edit" component={Edit} />
      </ProfStack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {},
});
