import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../Firebase/Firebase";

export default function Otp({ navigation, route }) {
  const name = route.params.name;
  const phone = route.params.phone;
  const number = route.params.number;
  const verificationId = route.params.verificationId;
  const [verificationCode, setVerificationCode] = React.useState(0);
  console.log(verificationId);
  return (
    <View style={styles.container}>
      <Text> We Send Otp to {phone} Please Check It If Not Edit Number</Text>
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
                  navigation.navigate("Home");
                });
              })
              .catch((err) => {
                alert(err.message);
              });

            console.log("Phone authentication successful 👍");
          } catch (err) {
            alert(err.message);
          }
        }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
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
    width: "100%",
    backgroundColor: "#059dc0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginLeft: 5,
  },
  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#f4f5fa",
    borderRadius: 15,
  },
});
