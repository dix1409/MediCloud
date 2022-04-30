import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import Slider from "./Slider/First";
import * as RootNavigation from "./Nav/RootNavigation";
import login from "./Auth/Login";
import Sign from "./Auth/Sign";
import { navigationRef } from "./Nav/RootNavigation";
import { auth } from "./Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

// import { createStackNavigator } from "@react-navigation/stack"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home/Home";
import Otp from "./Auth/Otp";
const AppStack = createStackNavigator();

export default function Main(props) {
  const [First, setFirst] = useState();
  const [User, setUser] = useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("First_Time");
      console.log(value);
      if (value !== null) {
        // value previously stored
        console.log("yesssss");
        setFirst(false);
        // console.log(First)
      } else {
        setFirst(true);
        // console.log(First)
      }
    } catch (e) {
      // error reading value
      setFirst(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    // console.log(getData())
    const check = getData();
    const unsub = onAuthStateChanged(auth, (user) => {
      user
        ? setUser(true)
        : !First
        ? RootNavigation.navigate("Login")
        : RootNavigation.navigate("OnBordingScreen");
    });
    return unsub;
  }, [First]);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <AppStack.Screen name="Load" component={Load} /> */}

        {!User && (
          <>
            <AppStack.Screen name="OnBordingScreen" component={Slider} />
            <AppStack.Screen name="Login" component={login} />
            <AppStack.Screen name="Register" component={Sign} />
            <AppStack.Screen name="Home" component={Home} />
            <AppStack.Screen name="Otp" component={Otp} />
          </>
        )}
        {User && <AppStack.Screen name="Home" component={Home} />}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {},
});
