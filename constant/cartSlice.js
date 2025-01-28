import { createSlice } from "@reduxjs/toolkit";

// Slice to manage cart functionality
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState: [], // Initial cart state is an empty array
  reducers: {
    // Add an item to the cart or increase its quantity if it already exists
    addToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove an item from the cart by its index
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },

    // Increase the quantity of an item in the cart
    increaseItemQuantity: (state, action) => {
      const index = action.payload;
      state[index].quantity += 1;
    },

    // Decrease the quantity of an item in the cart or remove it if the quantity reaches 0
    decreaseItemQuantity: (state, action) => {
      const index = action.payload;
      if (state[index].quantity > 1) {
        state[index].quantity -= 1;
      } else {
        state.splice(index, 1); // Remove the item if quantity is 0
      }
    }
  }
});

// Export the actions for use in components
export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity
} = cartSlice.actions;

// Export the reducer to be included in the store
export default cartSlice.reducer;
