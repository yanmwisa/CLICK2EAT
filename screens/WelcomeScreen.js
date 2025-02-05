import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable"; // Import Animatable for animations
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const WelcomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../assets/welcome-bg.jpeg")} // Background image
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          {/* Title Animation */}
          <Animatable.Text
            animation="fadeInDown" // Smooth fade-down effect
            duration={1500}
            style={styles.title}
          >
            <Text style={styles.whiteText}>Welcome to </Text>
            <Text style={styles.redText}>Click2Eat</Text>
          </Animatable.Text>

          {/* Subtitle Animation */}
          <Animatable.Text
            animation="fadeInUp" // Smooth fade-up effect
            duration={2000}
            delay={500}
            style={styles.subtitle}
          >
            Order your favorite dishes quickly and easily. Tap the button below
            to get started.
          </Animatable.Text>

          {/* Button Animation */}
          <Animatable.View
            animation="bounceIn" // Bouncy effect for button
            duration={2000}
            delay={1000}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)" // Dark overlay to enhance text visibility
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Bold" // Custom font (ensure it's linked)
  },
  whiteText: {
    color: "#fff" // White for "Welcome to"
  },
  redText: {
    color: "#EA2831" // Red for "Click2Eat"
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Poppins-Regular" // Ensure this font is available
  },
  button: {
    backgroundColor: "#EA2831",
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 25
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Poppins-Bold"
  }
});
