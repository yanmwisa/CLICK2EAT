import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const TransitionScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timeout to navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate("Tracking"); // Replace to remove this screen from the stack
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/transition.json")} // Update path to your animation file
        autoPlay
        loop={false} // Set to true if you want it to loop
        style={styles.animation}
      />
      <Text style={styles.text}>Preparing your order...</Text>
    </View>
  );
};

export default TransitionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  video: {
    width: 300,
    height: 300, // Adjust based on your video size
    borderRadius: 10
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#333"
  }
});
