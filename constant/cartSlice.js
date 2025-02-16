import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const updateOrderStatus = createAsyncThunk(
  "cart/updateOrderStatus",
  async (orderId, { dispatch }) => {
    const statusFlow = ["Received Order", "Preparing", "Ready for Pickup"];

    for (const status of statusFlow) {
      await new Promise((resolve) => setTimeout(resolve, 8000)); //waits 8 seconds to change the order status(can be changed at a later stage)

      dispatch(changeOrderStatus({ orderId, newStatus: status }));
    }

    await new Promise((resolve) => setTimeout(resolve, 60000)); 

    dispatch(moveToPastOrders());
  }
);



// Slice to manage cart functionality
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState: {
    cartItems:[],
    activity: [], //current orders
    previousOrders: [], //completed orders
  }, // Initial cart state is an empty array

  

  reducers: {
    // Add an item to the cart or increase its quantity if it already exists
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove an item from the cart by its index
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.cartItems.splice(index, 1);
    },

    // Increase the quantity of an item in the cart
    increaseItemQuantity: (state, action) => {
      const index = action.payload;
      state.cartItems[index].quantity += 1;
    },

    // Decrease the quantity of an item in the cart or remove it if the quantity reaches 0
    decreaseItemQuantity: (state, action) => {
      const index = action.payload;
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
      } else {
        state.cartItems.splice(index, 1); // Remove the item if quantity is 0
      }
    },
    confirmOrder: (state) => {
      state.activity = [
        ...state.activity,
        ...state.cartItems.map((item) => ({
          ...item,
          id: `${item.name}-${Date.now()}`, //unique id for each order
          status: "Received Order",
          time: new Date().toLocaleTimeString(),
        })),
      ];
      state.cartItems = []; 
    },

    changeOrderStatus: (state, action) => {
      const { orderId, newStatus } = action.payload;
      state.activity = state.activity.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
    },

    moveToPastOrders: (state, action) => {
      const completedOrders = state.activity.filter(
        (order) => order.status === "Ready for Pickup"
      );
    
      state.previousOrders = [...state.previousOrders, ...completedOrders];
    
      // Keep only active orders in `activity`
      state.activity = state.activity.filter(
        (order) => order.status !== "Ready for Pickup"
      );
    },
  },    

   extraReducers: (builder) => {
    builder.addCase(updateOrderStatus.fulfilled, (state) => {
      console.log("Order status updated");
    });
  },  
});



// Export the actions for use in components
export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  confirmOrder,
  changeOrderStatus,
  moveToPastOrders
} = cartSlice.actions;

// Export the reducer to be included in the store
export default cartSlice.reducer;
