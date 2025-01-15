import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppScreens from "./Navigation/AppScreens";

export default function App() {
  return <AppScreens />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
