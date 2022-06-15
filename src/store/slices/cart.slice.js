import { createSlice } from '@reduxjs/toolkit';
import { createCart, updateCart } from '../actions/cart.action';
// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
  },
  reducers: {
    reset: (state) =>  {
      state.cart = null
      state.isError=false
      state.isSuccess=false
      state.isLoading=false
      state.message=''
    },
  },
  extraReducers:(builder) => {
    builder.addCase(createCart.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ''
      })
      builder.addCase(createCart.fulfilled, (state, action) => {
        state.isSuccess = true
        state.cart = action.payload?.data
        state.isError = false
        state.isLoading = false
        state.message = ''
      })
      builder.addCase(createCart.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isLoading = false
      })
      builder.addCase(updateCart.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ''
      })
      builder.addCase(updateCart.fulfilled, (state, action) => {
        state.isSuccess = true
        state.cart = action.payload?.data
        state.isError = false
        state.isLoading = false
        state.message = ''
      })
      builder.addCase(updateCart.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isLoading = false
      })
  }
});
export const {reset} = cartSlice.actions
export default cartSlice.reducer;