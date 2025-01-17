import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MenuScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={23} color="white" />
      </TouchableOpacity>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a catalogue"
          placeholderTextColor="#aaa"
        />
        <Ionicons
          name="search-outline"
          size={39}
          color="#EA2831"
          style={styles.searchIcon}
          onPress={() => alert("press")}
        />
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  backButton: {
    backgroundColor: "#EA2831", // Change this to match your Welcome Screen button color
    padding: 10,
    marginLeft: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginBottom: 20
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 5,
    height: 65,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    borderWidth: 2,
    borderColor: "#ddd",
    width: "80%",
    alignSelf: "center"
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingLeft: 10
  },
  searchIcon: {
    marginRight: 10
  }
});
