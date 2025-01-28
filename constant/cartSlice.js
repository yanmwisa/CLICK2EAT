import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
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
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.splice(index, 1); // Remove item by index
    },
    increaseItemQuantity: (state, action) => {
      const index = action.payload;
      state[index].quantity += 1;
    },
    decreaseItemQuantity: (state, action) => {
      const index = action.payload;
      if (state[index].quantity > 1) {
        state[index].quantity -= 1;
      } else {
        state.splice(index, 1); // Remove item if quantity goes to 0
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity
} = cartSlice.actions;
export default cartSlice.reducer;
