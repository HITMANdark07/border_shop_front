import { createSlice } from '@reduxjs/toolkit';
import { getProducts,getProductsByCategory } from '../actions/products.action';
// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
  },
  reducers: {
    reset: (state) =>  {
      state.products = []
      state.isError=false
      state.isSuccess=false
      state.isLoading=false
      state.message=''
    }
  },
  extraReducers:(builder) => {
      builder.addCase(getProducts.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ''
      })
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.isSuccess = true
        state.products = action.payload?.data
        state.isError = false
        state.isLoading = false
        state.message = ''
      })
      builder.addCase(getProducts.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isLoading = false
      })
      builder.addCase(getProductsByCategory.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ''
      })
      builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isSuccess = true
        state.products = action.payload?.data
        state.isError = false
        state.isLoading = false
        state.message = ''
      })
      builder.addCase(getProductsByCategory.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isLoading = false
      })
  }
});
export const {reset} = productsSlice.actions
export default productsSlice.reducer;