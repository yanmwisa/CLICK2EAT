import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { View, Text } from "react-native";
import AppScreens from "./Navigation/AppScreens";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"), // Disponible
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"), // Disponible
        "Montserrat-Variable": require("./assets/fonts/Montserrat-VariableFont_wght.ttf") // Disponible
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Fonts...</Text>
      </View>
    ); // Ajoutez un écran de chargement ici si nécessaire
  }

  return <AppScreens />;
}
