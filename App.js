import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { View, Text } from "react-native";
import AppScreens from "./Navigation/AppScreens";
import { auth } from "./firebase-auth";
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
  // const startListening = () => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log(auth.currentUser.uid);
  //       } else {
  //         console.log("No user logged in"); 
  //       }
  //   })};
  
  // you check here if the account exist on the device 
  // useEffect(()=>{
  //   startListening();
  //   return () => stopListening();
  // },[auth?.currentUser?.uid]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Fonts...</Text>
      </View>
    ); // Ajoutez un écran de chargement ici si nécessaire
  }

  return <AppScreens />;
}
