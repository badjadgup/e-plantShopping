import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx';

export const createAppStore = () => configureStore({ reducer: { cart: cartReducer } });
export const store = createAppStore();
