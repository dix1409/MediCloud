import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../Firebase/Firebase";
const { height, width } = Dimensions.get("window");
export default function HomeScreen({ navigation }) {
  const Records = [
    {
      id: 1,
      img: require("../images/male1.png"),
      Name: "Dr.Golakiya",
      description: "diabetes",
      date: "04/02/2022",
    },
    {
      id: 2,
      img: require("../images/female4.png"),
      Name: "Dr.Patel",
      description: "Dengue",
      date: "17/01/2022",
    },
    {
      id: 3,
      img: require("../images/female2.png"),
      Name: "Dr.Pipliya",
      description: "malaria",
      date: "04/01/2022",
    },
    {
      id: 4,
      img: require("../images/male1.png"),
      Name: "Dr.Golakiya",
      description: "diabetes",
      date: "04/02/2022",
    },
    {
      id: 5,
      img: require("../images/female4.png"),
      Name: "Dr.Patel",
      description: "Dengue",
      date: "17/01/2022",
    },
    {
      id: 6,
      img: require("../images/female2.png"),
      Name: "Dr.Pipliya",
      description: "malaria",
      date: "04/01/2022",
    },
  ];
  const [name, setname] = useState("");
  const [data, setdata] = useState("");
  const [index, setindex] = useState(0);
  const [limit, setlimit] = useState(3);
  const [url, seturl] = useState({});
  useEffect(() => {
    const getData = async () => {
      if (auth.currentUser.phoneNumber.length > 0) {
        const data = await getDoc(
          doc(
            db,
            "user",
            auth.currentUser.phoneNumber.substring(
              3,
              auth.currentUser.phoneNumber.length
            )
          )
        );
        onSnapshot(
          doc(
            db,
            "user",
            auth.currentUser.phoneNumber.substring(
              3,
              auth.currentUser.phoneNumber.length
            )
          ),
          (snapshot) => {
            seturl(snapshot.data());
            console.log(snapshot.data());
            setname(snapshot.data().name);
          }
        );
      }
    };
    getData();
  }, [auth.currentUser.phoneNumber]);
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.firstBox}>
            <View style={styles.firstPart}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  //   backgroundColor: "red",
                }}
                onPress={() => navigation.openDrawer()}
              >
                <Image
                  source={{
                    uri:
                      url.image ||
                      "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1651326506/MieSport/image-removebg-preview_hhqgfj.png",
                  }}
                  style={{
                    width: "80%",
                    height: "80%",
                    overflow: "hidden",
                    borderRadius: 75,
                    marginTop: 15,
                    marginLeft: 15,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("Add Record");
                }}
              >
                <Text style={{ fontSize: 24 }}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.name}>
              <Text style={{ fontSize: 35 }}>Hello, </Text>
              <Text style={{ fontSize: 38, fontWeight: "bold" }}>{name}</Text>
            </View>
            <View style={styles.textInput}>
              <AntDesign
                name="search1"
                size={20}
                color="black"
                style={{ marginHorizontal: 5 }}
              />
              <TextInput style={{ flex: 1 }} />
            </View>
          </View>

          <View style={{ flex: 0.6 }}>
            {Records.slice(0, 3 * (index + 1)).map((data) => {
              return (
                <View style={styles.mainBox}>
                  <Image
                    source={data.img}
                    style={{ height: "100%", width: "30%" }}
                  />

                  <View>
                    <Text>{data.Name}</Text>
                    <Text style={{ color: "#999" }}>{data.description}</Text>
                    <Text style={{ marginTop: "auto", marginBottom: 5 }}>
                      Date OF Visit:{data.date}
                    </Text>
                  </View>
                </View>
              );
            })}

            {Records.slice(index * 3, 3 * (index + 2)).length > 0 && (
              <TouchableOpacity
                style={{ marginVertical: 10, textAlign: "center" }}
                onPress={() => {
                  setindex(index + 1);
                }}
              >
                <Text style={{ textAlign: "center" }}>See More</Text>
              </TouchableOpacity>
            )}
            {Records.slice((index - 1) * 3, 3 * index).length > 0 && (
              <TouchableOpacity
                style={{ marginVertical: 10, textAlign: "center" }}
                onPress={() => {
                  setindex(index - 1);
                }}
              >
                <Text style={{ textAlign: "center" }}>See Less</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
