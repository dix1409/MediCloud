import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { async } from "@firebase/util";

const COLORS = { primary: "#ffffff", white: "#000" };
const slides = [
  {
    id: "1",
    image: require("../images/png-transparent-hospital-electronic-health-record-medical-record-health-care-patient-physician-medicine-health-professional-removebg-preview.png"),
    title: "Your medical history is always at hand",
    subtitle:
      "We store certificate,test results,vaccination records, X-rays,sick leave certificates,doctor prescriptions and any other important information",
  },
  {
    id: "2",
    image: require("../images/secure_data-removebg-preview.png"),
    title: "We care about your security",
    subtitle:
      "We Safely protect your data and never transfer to any third party",
  },
  {
    id: "3",
    image: require("../images/medicalrecord2.png"),
    title: "easily store and find your documents",
    subtitle: "Take Photo of Your Medical Records and save them",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={item?.image}
        style={{ height: "70%", width, resizeMode: "contain" }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>

        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const getdata = async () => {
    try {
      await AsyncStorage.setItem("First_Time", "false");
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: "#34CA00",
                  width: 10,
                  height: 10,
                  borderRadius: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View
              style={{
                height: 50,
                borderColor: "#34CA00",
                borderWidth: 1,
                borderRadius: 3,
              }}
            >
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  getdata();
                  navigation.replace("Login");
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    backgroundColor: "transparent",
                  },
                ]}
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#C4C4C4",
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}
              >
                <Text
                  style={{
                    color: "#34CA00",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: RFPercentage(2),
    marginTop: 10,
    maxWidth: width * 0.87,
    textAlign: "center",
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: RFValue(20, height),
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: "#C4C4C4",
    marginHorizontal: 3,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnboardingScreen;
