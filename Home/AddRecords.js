import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import uid from "uid";

import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as DocumentPicker from "expo-document-picker";
import { auth, db, store } from "../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
const data = [
  { label: "cholesterol", value: "cholesterol" },
  { label: "dengue", value: "dengue" },
  { label: "malaria", value: "malaria" },
  { label: "diabetes", value: "diabetes" },
];

const AddRecords = () => {
  const [aadhar, setaadhar] = useState("");
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    const datas = async () => {
      const data = await getDoc(
        doc(
          db,
          `user/${auth.currentUser.phoneNumber.substring(
            3,
            auth.currentUser.phoneNumber.length
          )}`
        )
      );
      // console.log("data" + data.data());
      setaadhar(data.data().number);
    };
    datas();
  }, []);
  const [url, seturl] = useState("");
  const [value, setValue] = useState(null);
  const [drName, setdrName] = useState("");
  const [HName, setHName] = useState("");
  const [VisitingDate, setVisitingDate] = useState("");
  const [ugl, setugl] = useState("");
  const [fbgl, setfbgl] = useState("");
  const [rbgl, setrbgl] = useState("");
  const [hbA1c, sethbA1c] = useState("");
  // cholestrol.
  const [GlyC, setGlyC] = useState("");
  const [Lipids, setLipids] = useState("");
  const [HC, setHC] = useState("");
  const [LC, setLC] = useState("");
  const [bp, setbp] = useState("");
  // dangu
  const [Lc, setLc] = useState("");
  const [np, setnp] = useState("");
  const [hc, sethc] = useState("");

  const [lpc, setlpc] = useState("");
  const [rbc, setrbc] = useState("");
  const [hg, sethg] = useState("");
  // malaria
  const [drFirst, setdrFirst] = useState("");
  const [drlast, setdrLast] = useState("");
  const [hrCity, sethrCity] = useState("");
  const [wbc, setwbc] = useState("");
  const [Plate, setPlate] = useState("");
  const [crp, setcrp] = useState("");
  const [ph, setph] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [docs, setdocs] = useState();
  const [err, seterr] = useState();
  const [Rand, setRand] = useState();
  const [Load, setLoad] = useState(false);
  const submit = () => {
    setRand(auth.currentUser.uid + Math.floor(Math.random() * 127212));
    DocumentPicker.getDocumentAsync().then((document) => {
      if (document.mimeType === "application/pdf") {
        setdocs(document.uri);
        console.log(document.uri);
        setvisible(true);
      } else {
        seterr("Please Select a Pdf");
      }
    });
  };
  const SendData = async () => {
    uploadimage(docs);
  };
  const uploadimage = async (uri) => {
    console.log(Rand);

    const response = await fetch(uri);
    const blob = await response.blob();
    var docName = Rand;
    console.log("start");
    const refs = ref(
      store,
      `documents/${auth.currentUser.phoneNumber}` + docName
    );

    uploadBytes(refs, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadurl();
    });
  };
  const getDownloadurl = () => {
    const starsRef = ref(
      store,
      `documents/${auth.currentUser.phoneNumber}` + Rand
    );
    console.log(Rand);
    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        console.log("okkk");
        seturl(url);
        console.log(url);

        console.log("hooo");
        getData();
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

  // console.log(aadhar.split(" ").join(""));
  const getData = () => {
    console.log("noopeee");
    console.log(value);

    // console.log("loc");
    const loc2 = doc(
      db,
      `user/${auth.currentUser.phoneNumber.substring(
        3,
        auth.currentUser.phoneNumber
      )}/${value}/${Rand}`
    );
    const loc3 = doc(
      db,
      `${auth.currentUser.phoneNumber.substring(
        3,
        auth.currentUser.phoneNumber
      )}/${Rand}`
    );
    const loc4 = doc(db, `${aadhar.split(" ").join("")}/${Rand}`);
    // console.log("yuppsss");
    if (value === "malaria") {
      setDoc(doc(db, `users/${aadhar.split(" ").join("")}/${value}/${Rand}`), {
        DrFisrtname: drFirst,
        drLastname: drlast,
        Hospital_city: hrCity,
        Hospital_Name: HName,
        Visiting_date: VisitingDate,
        WBC: wbc,
        Haemoglobin: hg,
        Platelets: Plate,
        C_reactive_protein: crp,
        ph: ph,
        document: url,
        description: value,
      })
        .then(() => {
          setDoc(loc2, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            WBC: wbc,
            Haemoglobin: hg,
            Platelets: Plate,
            C_reactive_protein: crp,
            ph: ph,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc3, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            WBC: wbc,
            Haemoglobin: hg,
            Platelets: Plate,
            C_reactive_protein: crp,
            ph: ph,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc4, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            WBC: wbc,
            Haemoglobin: hg,
            Platelets: Plate,
            C_reactive_protein: crp,
            ph: ph,
            document: url,
            description: value,
          });
        })
        .then(() => {
          console.log("Yupp");
        });
    } else if (value == "diabetes") {
      setDoc(doc(db, `users/${aadhar.split(" ").join("")}/${value}/${Rand}`), {
        Hospital_city: hrCity,
        DrFisrtname: drFirst,
        drLastname: drlast,
        Hospital_Name: HName,
        Visiting_date: VisitingDate,
        Urine_glucose_level: ugl,
        Fasting_blood_glucose_level: fbgl,
        Random_blood_glucose_level: rbgl,
        hbA1c: hbA1c,
        document: url,
        description: value,
      })
        .then(() => {
          setDoc(loc2, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            WBC: wbc,
            Haemoglobin: hg,
            Platelets: Plate,
            C_reactive_protein: crp,
            ph: ph,
            document: url,
            Drname: drName,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Urine_glucose_level: ugl,
            Fasting_blood_glucose_level: fbgl,
            Random_blood_glucose_level: rbgl,
            hbA1c: hbA1c,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc3, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Urine_glucose_level: ugl,
            Fasting_blood_glucose_level: fbgl,
            Random_blood_glucose_level: rbgl,
            hbA1c: hbA1c,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc4, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Urine_glucose_level: ugl,
            Fasting_blood_glucose_level: fbgl,
            Random_blood_glucose_level: rbgl,
            hbA1c: hbA1c,
            document: url,
            description: value,
          });
        })
        .then(() => {
          console.log("Yupp");
        });
    } else if (value == "dengue") {
      console.log("dengu");
      setDoc(doc(db, `users/${aadhar.split(" ").join("")}/${value}/${Rand}`), {
        Hospital_city: hrCity,
        DrFisrtname: drFirst,
        drLastname: drlast,
        Hospital_Name: HName,
        Visiting_date: VisitingDate,
        Leukocytes: Lc,
        Lymphocytes: lpc,
        Red_Blood_cells: rbc,
        Hemoglobin: hg,
        Neutrophils: np,
        document: url,
        description: value,
      })
        .then(() => {
          setDoc(loc2, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Leukocytes: Lc,
            Lymphocytes: lpc,
            Red_Blood_cells: rbc,
            Hemoglobin: hg,
            Neutrophils: np,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc3, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Leukocytes: Lc,
            Lymphocytes: lpc,
            Red_Blood_cells: rbc,
            Hemoglobin: hg,
            Neutrophils: np,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc4, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Leukocytes: Lc,
            Lymphocytes: lpc,
            Red_Blood_cells: rbc,
            Hemoglobin: hg,
            Neutrophils: np,
            document: url,
            description: value,
          });
        })
        .then(() => {
          console.log("Yupp");
        });
    } else if (value == "cholesterol") {
      setDoc(doc(db, `users/${aadhar.split(" ").join("")}/${value}/${Rand}`), {
        Hospital_city: hrCity,
        DrFisrtname: drFirst,
        drLastname: drlast,
        Hospital_Name: HName,
        Hospital_city: hrCity,
        Visiting_date: VisitingDate,
        Glycaemic_C: GlyC,
        Lipids: Lipids,
        HDL_cholesterol: HC,
        LDL_cholesterol: LC,
        Blood_Pressure: bp,
        document: url,
        description: value,
      })
        .then(() => {
          setDoc(loc2, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Glycaemic_C: GlyC,
            Lipids: Lipids,
            HDL_cholesterol: HC,
            LDL_cholesterol: LC,
            Blood_Pressure: bp,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc3, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Glycaemic_C: GlyC,
            Lipids: Lipids,
            HDL_cholesterol: HC,
            LDL_cholesterol: LC,
            Blood_Pressure: bp,
            document: url,
            description: value,
          });
        })
        .then(() => {
          setDoc(loc4, {
            Hospital_city: hrCity,
            DrFisrtname: drFirst,
            drLastname: drlast,
            Hospital_Name: HName,
            Visiting_date: VisitingDate,
            Glycaemic_C: GlyC,
            Lipids: Lipids,
            HDL_cholesterol: HC,
            LDL_cholesterol: LC,
            Blood_Pressure: bp,
            document: url,
            description: value,
          });
        })
        .then(() => {
          console.log("Yupp");
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.space}>
        <Text style={{ color: "#334b91" }}>Doctor Name</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={[styles.textInput, { width: "90%" }]}
              onChangeText={(txt) => {
                setdrFirst(txt);
              }}
              placeholder="First Name"
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              style={[styles.textInput, { width: "90%" }]}
              onChangeText={(txt) => {
                setdrLast(txt);
              }}
              placeholder="Last Name"
            />
          </View>
        </View>
        <View style={styles.space}>
          <Text style={{ color: "#334b91" }}>Hospital Name</Text>

          <TextInput
            style={styles.textInput}
            onChangeText={(txt) => {
              setHName(txt);
            }}
          />
        </View>
        <View style={styles.space}>
          <Text style={{ color: "#334b91" }}>Hospital City</Text>

          <TextInput
            style={styles.textInput}
            onChangeText={(txt) => {
              sethrCity(txt);
            }}
          />
        </View>

        <View style={styles.space}>
          <Text style={{ color: "#334b91" }}>Visiting Date</Text>

          <TextInput
            style={styles.textInput}
            onChangeText={(txt) => {
              setVisitingDate(txt);
            }}
            dataDetectorTypes
          />
        </View>
      </View>
      <Modal transparent visible={visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              paddingVertical: 30,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "100%",

                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setvisible(false);
                  }}
                >
                  <Entypo name="cross" size={50} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <AntDesign name="checkcircle" size={150} color="#2ecc71" />
                <LottieView
                  autoPlay
                  source={require("../../Animations/52058-check.json")}
                />
              </View>

              <Text
                style={{
                  alignItems: "center",
                  marginVertical: 30,
                  fontSize: 20,
                  fontFamily: "OpanSans",
                }}
              >
                You Joined Successfully!
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "blue" },
          styles.space,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Disease" : "..."}
        // searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
      {value === "cholesterol" && (
        <>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Glycaemic C</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setGlyC(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Lipids</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setLipids(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>HDL cholesterol</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setHC(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>LDL cholesterol</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setLC(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Blood Pressure</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setbp(txt);
              }}
            />
          </View>
        </>
      )}
      {value === "dengue" && (
        <>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Leukocytes</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setLc(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Neutrophils</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setnp(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>HDL cholesterol</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setHC(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Lymphocytes</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setlpc(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Red Blood cells</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setrbc(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Hemoglobin</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                sethg(txt);
              }}
            />
          </View>
        </>
      )}
      {value === "malaria" && (
        <>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>WBC</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setwbc(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Haemoglobin</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                sethg(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Platelets</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setPlate(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>C-reactive protein</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setcrp(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>PH</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setph(txt);
              }}
            />
          </View>
        </>
      )}
      {value === "diabetes" && (
        <>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Urine glucose level</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setugl(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>
              Fasting blood glucose level
            </Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setfbgl(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>Random blood glucose level</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                setrbgl(txt);
              }}
            />
          </View>
          <View style={styles.space}>
            <Text style={{ color: "#334b91" }}>hbA1c</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={(txt) => {
                sethbA1c(txt);
              }}
            />
          </View>
        </>
      )}
      <TouchableOpacity
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "#caf0f8",
          marginTop: 35,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
        onPress={submit}
      >
        <Text style={{ color: "#000" }}>+ Add Documents</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "#caf0f8",
          marginVertical: 35,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
        onPress={SendData}
      >
        <Text style={{ color: "black" }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRecords;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#f4f5fa",
    borderRadius: 15,
  },
  space: {
    marginTop: 20,
  },
});
