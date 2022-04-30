import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

import { auth, db } from "../Firebase/Firebase";

export default function Otp({ navigation, route }) {
  const [Load, setLoad] = useState(false);
  const name = route.params.name;
  const phone = route.params.phone;
  const number = route.params.number;
  const verificationId = route.params.verificationId;
  const [verificationCode, setVerificationCode] = React.useState(0);
  console.log(verificationId);
  return (
    <View style={styles.container}>
      {!Load && (
        <View
          style={{
            height: "60%",
            backgroundColor: "rgba(105,105,105,0.2)",
            borderRadius: 15,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // elevation: 0,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              margin: 5,
              marginTop: 20,
              paddingHorizontal: 15,
            }}
          >
            {" "}
            We Sent an Otp to {phone} Please Check If Not received Press Back
          </Text>
          <TextInput
            placeholder="Enter Otp"
            keyboardType="number-pad"
            onChangeText={(txt) => setVerificationCode(txt)}
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.box2}
            onPress={async () => {
              try {
                setLoad(true);
                console.log("yes");
                console.log(verificationCode);
                const credential = PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );

                await signInWithCredential(auth, credential)
                  .then(() => {
                    console.log("yesss");
                    setDoc(doc(db, "user", phone), {
                      name: name,
                      phone: phone,
                      number: number,
                    }).then(() => {
                      setLoad(false);
                      navigation.navigate("Home");
                    });
                  })
                  .catch((err) => {
                    alert(err.message);
                  });

                console.log("Phone authentication successful 👍");
              } catch (err) {
                setLoad(false);
                alert(err.message);
              }
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {Load && (
        <LottieView
          source={require("../103187-cloud-security.json")}
          autoPlay
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  box2: {
    // flex: 1,
    marginTop: 40,
    height: 40,
    width: "80%",
    backgroundColor: "#059dc0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "#f4f5fa",
    borderRadius: 10,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
