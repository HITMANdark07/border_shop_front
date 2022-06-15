import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import useReducer from './slices/user.slice';
import productsReducer from './slices/products.slice';
import productReducer from './slices/product.slice';
import cartReducer from './slices/cart.slice';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: useReducer,
  products: productsReducer,
  product:productReducer,
  cart:cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer:persistedReducer,
  devTools:process.env.REACT_APP_ENV!=='production',
  middleware:[thunk]
})
export default store;