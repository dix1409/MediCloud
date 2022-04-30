import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import PDFReader from "rn-pdf-reader-js";
import WebView from "react-native-webview";

export default function Details({ route }) {
  const [Open, setOpen] = useState(false);
  const data = route.params.data;
  return (
    <View style={styles.container}>
      {!Open && (
        <View style={styles.blue}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              textDecorationLine: "underline",
            }}
          >
            Details
          </Text>
          <Text style={styles.txt}>
            Doctor Name: {data.DrFisrtname} {data.drLastname}
          </Text>
          <Text style={styles.txt}>Hospital Name: {data.Hospital_Name}</Text>
          <Text style={styles.txt}>Hospital city: {data.Hospital_city}</Text>
          <Text style={styles.txt}>Visiting Date: {data.Visiting_date}</Text>
          <Text
            style={[
              styles.txt,
              {
                textDecorationLine: "underline",
                fontWeight: "bold",
                fontSize: 20,
              },
            ]}
          >
            Medical Data
          </Text>
          {data.description === "cholesterol" && (
            <>
              <Text style={styles.txt}>
                Blood Pressure:{data.Blood_Pressure}
              </Text>
              <Text style={styles.txt}>Glycaemic C:{data.Glycaemic_C}</Text>
              <Text style={styles.txt}>
                HDL cholesterol:{data.HDL_cholesterol}
              </Text>
              <Text style={styles.txt}>
                LDL cholesterol:{data.LDL_cholesterol}
              </Text>
              <Text style={styles.txt}>Lipids:{data.Lipids}</Text>
            </>
          )}
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => {
                setOpen(true);
              }}
            >
              <Text>View Documents</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {Open && (
        <PDFReader
          source={{
            uri: data.document,
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blue: {
    marginHorizontal: "5%",
    height: "95%",
    marginVertical: "5%",
    borderRadius: 15,
    backgroundColor: "#caf0f8",
    elevation: 10,
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#A9CBFF",
    alignItems: "center",
    marginVertical: 7,
    width: "90%",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    // fontWeight: "bold",
    fontSize: 18,
    margin: 7,
  },
});
