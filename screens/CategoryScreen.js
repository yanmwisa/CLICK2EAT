import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../constant/cartSlice";
import CartScreen from "./CartScreen";

const CategoryScreen = ({ route, navigation }) => {
  const { categoryName, categoryItems } = route.params; // Extract category data from route params
  const dispatch = useDispatch(); // Redux dispatch for adding items to the cart
  const cartItems = useSelector((state) => state.cart.cartItems);
 // Retrieve cart items from Redux
  // const [isCartModalVisible, setCartModalVisible] = useState(false); // State to handle cart modal visibility

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={23} color="white" />
      </TouchableOpacity>

      {/* Category Title */}
      <Text style={styles.title}>{categoryName}</Text>

      {/* List of Items in the Category */}
      <FlatList
        data={categoryItems}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => dispatch(addToCart(item))} // Add item to cart on press
          >
            <Text style={styles.itemName}>{item.name}</Text>
            {item.options && (
              <FlatList
                data={item.options}
                keyExtractor={(option, optIdx) => `${optIdx}`}
                renderItem={({ item: option }) => (
                  <Text style={styles.itemOption}>
                    {option.pieces ? `${option.pieces} pcs` : option.size} -{" "}
                    {option.price}
                  </Text>
                )}
              />
            )}
            {!item.options && (
              <Text style={styles.itemPrice}>{item.price}</Text>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Conditional "View Cart" Button */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          // onPress={() => setCartModalVisible(true)} // Open the cart modal
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.cartButtonText}>
            View Cart ({cartItems.length}) {/* Show number of items in the cart */}
          </Text>
        </TouchableOpacity>
      )}

      {/* Cart Modal */}
      {/* <Modal
        visible={isCartModalVisible}
        animationType="slide"
        transparent={true} // Modal appears over the current screen
        onRequestClose={() => setCartModalVisible(false)} // Close modal on back press
      >
        <CartScreen closeModal={() => setCartModalVisible(false)} />
      </Modal> */}
    </SafeAreaView>
  );
};

export default CategoryScreen;

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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5
  },
  itemOption: {
    fontSize: 16,
    color: "#555"
  },
  itemPrice: {
    fontSize: 16,
    color: "#EA2831",
    fontWeight: "bold"
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#EA2831",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center"
  },
  cartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});