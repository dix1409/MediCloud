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
import { auth, db, store } from "../Firebase/Firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export default function Edit({ navigation, route }) {
  const data = route.params.data;
  console.log(data.image);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [url, seturl] = useState("");
  const [image, setImage] = useState(data.image);
  const [visible, setVisible] = useState(false);
  const [birth, setbirth] = useState(data.birth);
  const [show, setshow] = useState(false);
  const [name, setname] = useState(data.name);
  const [email, setemail] = useState(data.email);
  const [blood, setBlood] = useState(data.blood);
  const [aadhar, setaadhar] = useState("");
  const onChange = (selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      const date = JSON.stringify(currentDate);
      setbirth(date.slice(1, 11));
      console.log(date.slice(1, 11));

      setshow(false);
    }
  };
  const [load, setLoad] = useState(false);
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  useEffect(() => {
    if (image) {
      uploadimage(image);
    }
  }, [image]);
  const takePhotoFromCamera = async () => {
    requestPermission();
    if (status.granted) {
      console.log("hello");
      let photo = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!photo.cancelled) {
        setImage(photo.uri);
      }
    }
  };
  // useEffect(() => {
  //   const getData = async () => {
  //     if (auth.currentUser.phoneNumber.length > 0) {
  //       const data = await getDoc(
  //         doc(
  //           db,
  //           "user",
  //           auth.currentUser.phoneNumber.substring(
  //             3,
  //             auth.currentUser.phoneNumber.length
  //           )
  //         )
  //       );

  //       // setdata(data.data());
  //       setaadhar(data.data().number);
  //     }
  //   };
  //   getData();
  // }, [auth.currentUser.phoneNumber]);

  const uploadimage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const refs = ref(store, auth.currentUser.phoneNumber);

    uploadBytes(refs, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadurl();
    });
  };
  const getDownloadurl = () => {
    const starsRef = ref(store, auth.currentUser.phoneNumber);

    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        seturl(url);
        console.log(url);
        setload(false);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  };
  // console.log(blood);
  const submit = async () => {
    await updateDoc(
      doc(
        db,
        `user/${auth.currentUser.phoneNumber.slice(
          3,
          auth.currentUser.phoneNumber.length
        )}/Profile/${auth.currentUser.phoneNumber}`
      ),
      {
        name: name,
        email: email,
        blood: blood,
        birth: birth,
        image: url,
      }
    )
      .then(() => {
        console.log("yes");
        navigation.navigate("SeeProf");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const choosePhotoFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.base64)

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.circle}>
        <TouchableOpacity onPress={toggleBottomNavigationView}>
          {!data.image ? (
            <FontAwesome5 name="camera-retro" size={40} color="black" />
          ) : (
            <ImageBackground
              source={{ uri: image }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 75,
                overflow: "hidden",
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: 350,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
          }}
        >
          <View style={styles.panel}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.panelTitle}>Upload Photo</Text>
              <Text style={styles.panelSubtitle}>
                Choose Your Profile Picture
              </Text>
            </View>

            <TouchableOpacity onPress={takePhotoFromCamera}>
              <LinearGradient
                style={styles.panelButton}
                colors={["#caf0f8", "#caf0f8"]}
              >
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={choosePhotoFromLibrary}>
              <LinearGradient
                style={styles.panelButton}
                colors={["#caf0f8", "#caf0f8"]}
              >
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleBottomNavigationView();
                setImage(null);
              }}
            >
              <LinearGradient
                colors={["#caf0f8", "#caf0f8"]}
                style={styles.panelButton}
              >
                <Text style={styles.panelButtonTitle}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Full Name</Text>

        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={(txt) => {
            setname(txt);
          }}
        />
      </View>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Email Address</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={(txt) => {
            setemail(txt);
          }}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Blood Group</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={(txt) => {
            setBlood(txt);
          }}
          value={blood}
        />
      </View>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Date Of Birth</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={(txt) => {
            setbirth(txt);
          }}
          value={birth}
        />
      </View>
      <TouchableOpacity
        style={[styles.panelButton, { marginTop: 15 }]}
        onPress={submit}
      >
        <Text>Update Profile</Text>
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
