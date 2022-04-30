import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import DateTimePicker from "react-native-modal-datetime-picker";

import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { auth, db, store } from "../../Firebase/Firebase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

export default function Profile({ navigation, route }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [data, setdata] = React.useState({});

  useEffect(() => {
    const getData = async () => {
      if (auth.currentUser.phoneNumber.length > 0) {
        onSnapshot(
          doc(
            db,
            "user",
            auth.currentUser.phoneNumber.substring(
              3,
              auth.currentUser.phoneNumber.length
            ),
            "Profile",
            auth.currentUser.phoneNumber
          ),
          (snapshot) => {
            setdata(snapshot.data());
          }
        );

        // setdata(data.data());
        // console.log(data.data());
        // setaadhar(data.data().number);
      }
    };
    getData();
  }, [auth.currentUser.phoneNumber]);
  console.log(data);
  // console.log(blood);
  //   const submit = async () => {
  //     await setDoc(
  //       doc(
  //         db,
  //         `user/${auth.currentUser.phoneNumber.slice(
  //           3,
  //           auth.currentUser.phoneNumber.length
  //         )}/Profile/${auth.currentUser.phoneNumber}`
  //       ),
  //       {
  //         name: name,
  //         email: email,
  //         blood: blood,
  //         birth: birth,
  //         image: url,
  //       }
  //     )
  //       .then(() => {
  //         console.log("yes");
  //         navigation.navigate("SeeProf");
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.circle}>
        <ImageBackground
          source={{ uri: data?.image }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 75,
            overflow: "hidden",
          }}
        />
      </View>

      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Full Name</Text>

        <View style={styles.textInput}>
          <Text>{data?.name}</Text>
        </View>
      </View>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Email Address</Text>

        <View style={styles.textInput}>
          <Text>{data?.email}</Text>
        </View>
      </View>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Blood Group</Text>

        <View style={styles.textInput}>
          <Text>{data?.blood}</Text>
        </View>
      </View>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Date Of Birth</Text>

        <View style={styles.textInput}>
          <Text>{data?.birth}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.panelButton, { marginTop: 15 }]}
        onPress={() => {
          navigation.navigate("Edit", { data: data });
        }}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 75,
    backgroundColor: "rgba(128,128,128,0.5)",
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#A9CBFF",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    // fontWeight: "bold",
    color: "black",
  },
  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#f4f5fa",
    borderRadius: 15,
    padding: 5,
  },
  space: {
    marginTop: 20,
  },
});
