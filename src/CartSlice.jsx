import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    // Adding an existing plant increments its quantity instead of creating a duplicate row.
    addItem(state, action) {
      const plant = action.payload;
      const existingItem = state.items.find((item) => item.id === plant.id);
      if (existingItem) existingItem.quantity += 1;
      else state.items.push({ ...plant, quantity: 1 });
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (!Number.isInteger(quantity) || quantity < 0) return;
      if (quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const item = state.items.find((plant) => plant.id === id);
      if (item) item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartQuantity = (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export default cartSlice.reducer;
