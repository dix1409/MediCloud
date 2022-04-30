import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import LottieView from "lottie-react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { app, auth } from "../Firebase/Firebase";
export default function Sign({ navigation }) {
  const recaptchaVerifier = React.useRef(null);
  const [Choose, setChoose] = React.useState("Patient");
  const [name, setname] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [number, setnumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [Load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const Check = () => {
    if (
      name == "" ||
      phone == "" ||
      number == "" ||
      phone.length < 10 ||
      number.length < 12
    ) {
      return false;
    }
    return true;
  };
  const GetData = async () => {
    // The FirebaseRecaptchaVerifierModal ref implements the
    // FirebaseAuthApplicationVerifier interface and can be
    // passed directly to `verifyPhoneNumber`.
    setLoad(true);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider
        .verifyPhoneNumber("+91" + phone, recaptchaVerifier.current)
        .catch((err) => {
          setError(err.message);
          setLoad(false);
          return;
        });
      setVerificationId(verificationId);
      setLoad(false);
      navigation.navigate("Otp", {
        verificationId: verificationId,
        name: name,
        number: number,
        phone: phone,
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };
  const handleCardNumber = (text) => {
    let formattedText = text.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }
    setnumber(formattedText);
    return formattedText;
  };
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
      {!Load && (
        <>
          <Text style={{ color: "red" }}>{error}</Text>
          <View>
            <Text style={{ fontSize: 22, color: "#334b91" }}>
              Store Your Important Medic Records in Safe Hands 📃
            </Text>

            <Text
              style={{
                fontSize: 17,
                color: "#334b91",
                marginTop: 25,
                marginBottom: 10,
              }}
            >
              I am registering as{" "}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.box,
                  {
                    backgroundColor: Choose === "Patient" ? "#059dc0" : "#fff",
                  },
                ]}
                onPress={() => setChoose("Patient")}
              >
                <Text style={{ color: Choose === "Patient" ? "#fff" : "#000" }}>
                  Patient
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.box,
                  { backgroundColor: Choose === "Doctor" ? "#059dc0" : "#fff" },
                ]}
                onPress={() => setChoose("Doctor")}
              >
                <Text style={{ color: Choose === "Doctor" ? "#fff" : "#000" }}>
                  Doctor
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.space}>
              <Text style={{ color: "#334b91" }}>{Choose}'s Name</Text>

              <TextInput
                style={styles.textInput}
                onChangeText={(txt) => {
                  setname(txt);
                }}
              />
            </View>
            <View style={styles.space}>
              <Text style={{ color: "#334b91" }}>Mobile Number</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(txt) => {
                    setphone(txt);
                  }}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <View style={styles.space}>
              <Text style={{ color: "#334b91" }}>
                {Choose == "Doctor" ? "Doctor Id Number" : "Aadhar Card Number"}
              </Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(txt) => {
                    handleCardNumber(txt);
                  }}
                  keyboardType="number-pad"
                  value={number}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.box2}
              onPress={() => {
                Check() ? GetData() : setError("*Please Fill All Details");
              }}
            >
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
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
    backgroundColor: "#fff",
    padding: 25,

    justifyContent: "center",
  },
  box: {
    width: "45%",
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    marginHorizontal: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#f4f5fa",
    borderRadius: 15,
  },
  box2: {
    // flex: 1,
    marginTop: 40,
    height: 40,
    backgroundColor: "#059dc0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginLeft: 5,
  },
  space: {
    marginTop: 20,
  },
});
