import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/authSlice';
import cartReducer from './store/cartSlice';
import productsReducer from './store/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer
  }
});

export default store;