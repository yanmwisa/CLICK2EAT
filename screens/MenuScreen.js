import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const menus = {
  "Lincoln Way": [
    { id: 1, name: "Grilled Tilapia", price: 12.99, image: require("../assets/drinks.jpg") },
    { id: 2, name: "Fried Catfish", price: 11.99, image: require("../assets/drinks.jpg") },
    { id: 3, name: "Salmon Steak", price: 15.99, image: require("../assets/drinks.jpg") }
  ],
  Edison: [
    { id: 1, name: "Fried Chicken Wings", price: 9.99, image: require("../assets/drinks.jpg") },
    { id: 2, name: "Grilled Chicken Breast", price: 10.99, image: require("../assets/drinks.jpg") },
    { id: 3, name: "Chicken Tenders", price: 8.99, image: require("../assets/drinks.jpg") }
  ],
  Michigan: [
    { id: 1, name: "French Fries", price: 3.99, image: require("../assets/drinks.jpg") },
    { id: 2, name: "Onion Rings", price: 4.99, image: require("../assets/drinks.jpg") },
    { id: 3, name: "Coleslaw", price: 2.99, image: require("../assets/drinks.jpg") }
  ]
};

const MenuScreen = ({ location, navigation }) => {
  const menuItems = menus[location] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (navigation && navigation.goBack) {
            navigation.goBack();
          } else {
            console.warn("Navigation object is not defined");
          }
        }}
      >
        <Ionicons name="arrow-back" size={23} color="white" />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a menu item"
          placeholderTextColor="#aaa"
        />
        <Ionicons
          name="search-outline"
          size={39}
          color="#EA2831"
          style={styles.searchIcon}
          onPress={() => alert("Search pressed")}
        />
      </View>

      {/* Menu Title */}
      <Text style={styles.title}>{location} Menu</Text>

      {/* Menu List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
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
    backgroundColor: "#EA2831",
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
    paddingHorizontal: 10,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "black"
  },
  searchIcon: {
    marginRight: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#EA2831"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 10
  },
  cardContent: {
    flex: 1,
    padding: 10
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5
  },
  itemPrice: {
    fontSize: 16,
    color: "#EA2831",
    fontWeight: "bold"
  },
  listContent: {
    paddingBottom: 20
  }
});