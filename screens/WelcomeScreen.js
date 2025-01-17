import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable"; // Importez Animatable

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/welcome-bg.jpeg")} // Image de fond
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          {/* Animation pour le titre */}
          <Animatable.Text
            animation="fadeInDown" // Animation légère
            duration={1500}
            style={styles.title}
          >
            <Text style={styles.whiteText}>Welcome to </Text>
            <Text style={styles.redText}>Click2Eat</Text>
          </Animatable.Text>

          {/* Animation pour le sous-titre */}
          <Animatable.Text
            animation="fadeInUp" // Apparition légère vers le haut
            duration={2000}
            delay={500}
            style={styles.subtitle}
          >
            Order your favorite dishes quickly and easily. Tap the button below
            to get started.
          </Animatable.Text>

          {/* Animation pour le bouton */}
          <Animatable.View
            animation="bounceIn" // Animation rebond pour le bouton
            duration={2000}
            delay={1000}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("HomeScreen")}
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
    backgroundColor: "rgba(0, 0, 0, 0.7)" // Superposition sombre pour faire ressortir le texte
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
    fontFamily: "Poppins-Bold" // Police pour le titre
  },
  whiteText: {
    color: "#fff" // Blanc pour "Welcome to"
  },
  redText: {
    color: "#EA2831" // Rouge pour "Click2Eat"
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Poppins-Regular" // Police pour le sous-titre
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
    fontFamily: "Poppins-Bold" // Police pour le texte du bouton
  }
});
