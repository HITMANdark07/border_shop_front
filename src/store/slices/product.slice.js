import { createSlice } from '@reduxjs/toolkit';
import { getProduct } from '../actions/product.action';
// Slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
  },
  reducers: {
    reset: (state) =>  {
      state.product = null
      state.isError=false
      state.isSuccess=false
      state.isLoading=false
      state.message=''
    },
    selectSize:(state, action) => {
      state.product.selected_size = action.payload;
    }
  },
  extraReducers:(builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ''
      })
      builder.addCase(getProduct.fulfilled, (state, action) => {
        state.isSuccess = true
        state.product = action.payload?.data
        state.isError = false
        state.isLoading = false
        state.message = ''
      })
      builder.addCase(getProduct.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isLoading = false
      })
  }
});
export const {reset,selectSize} = productSlice.actions
export default productSlice.reducer;