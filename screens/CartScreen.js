import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  confirmOrder,
  updateOrderStatus,
} from "../constant/cartSlice";
import { store } from "../constant/store";


const CartScreen = ({}) => {
  const cartItems = useSelector((state) => state.cart.cartItems); // Get the cart items from Redux
  const dispatch = useDispatch();
  const latestOrder = useSelector((state) => state.cart.activity[state.cart.activity.length - 1]);
  const navigation = useNavigation(); // Initialize navigation

  // Calculate totals for cart
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(
      item.options?.[0]?.price.replace(/[^0-9.-]+/g, "") || // Handle price with symbols (e.g., "$12.95")
        item.price.replace(/[^0-9.-]+/g, "") // Fallback to item.price
    );
    return total + (item.quantity || 1) * (itemPrice || 0); // Default to 0 if itemPrice is invalid
  }, 0);

  const taxRate = 0.07; // 7% tax in South Bend, Indiana
  const cardFeeRate = 0.03; // 3% card processing fee

  const tax = subtotal * taxRate;
  const totalCash = subtotal + tax; // Total for cash payment
  const totalCard = totalCash * (1 + cardFeeRate); // Total for card payment

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      {/* <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity> */}

      {/* Cart Title */}
      <Text style={styles.title}>Your Cart</Text>

      {/* Display Cart Items */}
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.cartItem}>
                {/* Item Information */}
                <View style={styles.cartItemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    {item.options ? item.options[0]?.price : item.price}
                  </Text>
                </View>

                {/* Actions for each item */}
                <View style={styles.cartActions}>
                  {/* Decrease Quantity */}
                  <TouchableOpacity
                    style={styles.circularButton}
                    onPress={() => dispatch(decreaseItemQuantity(index))}
                  >
                    <Ionicons name="remove" size={18} color="white" />
                  </TouchableOpacity>

                  {/* Display Quantity */}
                  <Text style={styles.quantityText}>{item.quantity || 1}</Text>

                  {/* Increase Quantity */}
                  <TouchableOpacity
                    style={styles.circularButton}
                    onPress={() => dispatch(increaseItemQuantity(index))}
                  >
                    <Ionicons name="add" size={18} color="white" />
                  </TouchableOpacity>

                  {/* Remove Item */}
                  <TouchableOpacity
                    style={styles.circularButton}
                    onPress={() => dispatch(removeFromCart(index))}
                  >
                    <Ionicons name="trash" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Totals Section */}
          <View style={styles.totalsContainer}>
            <Text style={styles.totalsHeader}>Order Summary</Text>

            <View style={styles.totalRow}>
              <Ionicons name="cash-outline" size={20} color="#EA2831" />
              <Text style={styles.label}>Subtotal:</Text>
              <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Ionicons name="calculator-outline" size={20} color="#EA2831" />
              <Text style={styles.label}>Tax (7%):</Text>
              <Text style={styles.value}>${tax.toFixed(2)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Ionicons name="wallet-outline" size={20} color="#EA2831" />
              <Text style={styles.label}>Total (Cash):</Text>
              <Text style={styles.value}>${totalCash.toFixed(2)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Ionicons name="card-outline" size={20} color="#EA2831" />
              <Text style={styles.label}>Total (Card, 3% Fee):</Text>
              <Text style={styles.value}>${totalCard.toFixed(2)}</Text>
            </View>


            <TouchableOpacity
              style={styles.trackOrderButton}
              onPress={() => {
                dispatch(confirmOrder()); 

                setTimeout(() => {
                  const state = store.getState(); 
                  const latestOrder = state.cart.activity[state.cart.activity.length - 1]; 

                  if (latestOrder?.id) {
                    dispatch(updateOrderStatus(latestOrder.id));
                    navigation.navigate("Transition");
                  }
                }, 100);
              }}
            >
              <Text style={styles.trackOrderButtonText}>Confirm Order</Text>
            </TouchableOpacity>

          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  closeButton: {
    backgroundColor: "#EA2831",
    padding: 12,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#EA2831"
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  cartItemInfo: {
    flex: 3,
    marginRight: 10
  },
  cartActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 2
  },
  circularButton: {
    backgroundColor: "#EA2831",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 6
  },
  totalsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  totalsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333"
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  trackOrderButton: {
    marginTop: 20,
    backgroundColor: "#EA2831",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  trackOrderButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
    marginTop: 50
  }
});
