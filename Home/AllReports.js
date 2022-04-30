import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../Firebase/Firebase";
const { height, width } = Dimensions.get("window");
export default function AllReports({ navigation }) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    let dat = [];
    onSnapshot(
      collection(
        db,
        `${auth.currentUser.phoneNumber.substring(
          3,
          auth.currentUser.phoneNumber.length
        )}`
      ),
      (snapshot) => {
        snapshot.forEach((data) => {
          dat.push({ ...data.data(), id: data.id });
          console.log(data.data());
        });
        setdata(dat);
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      {data.map((data) => {
        return (
          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate("Details", { data: data })}
            key={data.id}
          >
            {/* <Image
              source={data.img}
              style={{ height: "100%", width: "30%" }}
            /> */}
            <View style={{ display: "flex", flexDirection: "row", margin: 10 }}>
              <View style={{ width: "90%" }}>
                <Text>Dr. {data.drLastname}</Text>
                <Text style={{ color: "#999" }}>{data.description}</Text>
                <Text style={{ marginTop: "auto", marginBottom: 5 }}>
                  Date OF Visit:{data.Visiting_date}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: "auto",
                  marginTop: "auto",
                  marginBottom: "auto",
                  width: 45,
                  height: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  borderWidth: 1,
                }}
              >
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#caf0f8",
  },
  firstBox: {
    height: height * 0.4,
    display: "flex",
    backgroundColor: "#caf0f8",
    position: "relative",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  firstPart: {
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    width: "90%",
    height: 40,
    backgroundColor: "#f4f5fa",
    borderRadius: 15,
    alignItems: "center",
    // justifyContent: "center",
    elevation: 20,
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    // position: "absolute",
    flexDirection: "row",
    // top: "90%",
    // marginTop: "57%",
  },
  name: {
    display: "flex",
    marginTop: 15,
    padding: 10,
  },
  mainBox: {
    height: 100,
    margin: 10,
    elevation: 10,
    borderRadius: 15,
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "row",
  },
  btn: {
    height: 50,
    backgroundColor: "#fff",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    elevation: 25,
    marginLeft: "auto",
    marginTop: 15,
    marginRight: 15,
  },
});
