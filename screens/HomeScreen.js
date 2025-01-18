import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import EdisonScreen from "../components/EdisonScreen";
import LincolnWayscreen from "../components/LincolnWayscreen";
import MishiganScreen from "../components/MishiganScreen";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/homebg.jpeg")} // Remplacez par votre chemin d'image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        {/* Animation pour le titre */}
        <Animatable.Text
          animation="fadeInDown" // Apparition du haut
          duration={1500}
          style={styles.title}
        >
          Please select your favorite restaurant from the options below to start
          your delicious journey.
        </Animatable.Text>

        {/* Animation pour les boutons */}
        <Animatable.View animation="fadeInUp" delay={500} duration={1500}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() =>
              navigation.navigate("TabStack", { location: "Lincoln Way" })
            }
          >
            <Text style={styles.buttonText}>J-J Fish Lincoln Way</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={700} duration={1500}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              navigation.navigate("TabStack", { location: "Edison" })
            }
          >
            <Text style={styles.buttonText}>J-J Fish Edison</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={900} duration={1500}>
          <TouchableOpacity
            style={styles.button3}
            onPress={() =>
              navigation.navigate("TabStack", { location: "Michigan" })
            }
          >
            <Text style={styles.buttonText}>J-J Fish Mishigan</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // L'image remplit tout l'écran
    justifyContent: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)" // Noir semi-transparent pour un fond plus sombre
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff", // Texte en blanc pour un meilleur contraste
    marginBottom: 30,
    fontFamily: "Montserrat-Bold" // Police personnalisée
  },
  // button lincoln way
  button1: {
    backgroundColor: "#EA2831",
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 25,
    width: "80%",
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4 // Ombres pour Android
  },
  //   button edison
  button2: {
    backgroundColor: "#EA2831",
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 25,
    width: "80%",
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4 // Ombres pour Android
  },
  // button michigan
  button3: {
    backgroundColor: "#EA2831",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    width: "80%",
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4 // Ombres pour Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins-Bold" // Police personnalisée
  }
});
