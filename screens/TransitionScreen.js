import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const TransitionScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation for fade-in effect

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();

    // Set a timeout to navigate after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate("Tracking"); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    // Smooth red gradient background
    <LinearGradient
      colors={["#EA2831", "#F55B5F"]} 
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <LottieView
          source={require("../assets/animation.json")} 
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}>Processing Your Order...</Text>
      </Animated.View>
    </LinearGradient>
  );
};

export default TransitionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  animation: {
    width: 200,
    height: 200 
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
