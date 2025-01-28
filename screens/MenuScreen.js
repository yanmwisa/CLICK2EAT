import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import menus from "../constant/Menu.json"; // Import the menu data
import * as Animatable from "react-native-animatable"; // For animations

const categoryImages = {
  "Fish Dinners": require("../assets/fish.jpg"),
  "Chicken Dinners": require("../assets/chicken.jpg"),
  Sides: require("../assets/sides.jpg"),
  Drinks: require("../assets/drinks.jpg"),
  Desserts: require("../assets/desserts.jpg"),
  "Fish by the Piece": require("../assets/fish.jpg"), // New category
  "Shrimp Dinners": require("../assets/shrimp.jpg"), // New category
  Sandwiches: require("../assets/sandwich.jpg"), // New category
  "Buffalo Wings": require("../assets/buffalo_wings.jpg"), // New category
  "Kids Meal": require("../assets/kids_meals.jpg") // New category
};

const MenuScreen = ({ location, navigation }) => {
  // Get the selected location
  const menuItems = menus[location] || {};
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger animation when the screen loads
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={23} color="white" />
      </TouchableOpacity>

      {/* Menu Title */}
      <Text style={styles.title}>{`${location} Menu`}</Text>

      {/* Display Categories in Two Columns */}
      <Animatable.View
        animation={isVisible ? "fadeInUp" : undefined}
        duration={800}
        style={styles.listContainer}
      >
        <FlatList
          data={Object.keys(menuItems)}
          keyExtractor={(item, index) => `${item}-${index}`}
          numColumns={2} // Display items in two columns
          columnWrapperStyle={styles.columnWrapper} // Style for the row
          renderItem={({ item: category }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Category", {
                  categoryName: category,
                  categoryItems: menuItems[category]
                })
              }
            >
              <Image
                source={categoryImages[category]} // Load the corresponding image
                style={styles.cardImage}
              />
              <Text style={styles.categoryTitle}>{category}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      </Animatable.View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#EA2831"
  },
  listContainer: {
    flex: 1
  },
  columnWrapper: {
    justifyContent: "space-between", // Add space between the columns
    marginBottom: 20 // Add spacing between rows
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5, // Spacing between cards
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center" // Center the image and text
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center"
  },
  listContent: {
    paddingBottom: 20 // Add spacing at the bottom of the list
  }
});
