import api from '../api';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk(
    'products/list',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.get('/products/list')
        return response.data
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        toast.error(message)
        return rejectWithValue(message)
      }
    }
  )

  
  export const getProductsByCategory = createAsyncThunk(
      'products/category',
      async (data, { rejectWithValue }) => {
        try {
          const response = await api.get(`/products/categories/${data}`)
          return response.data
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          toast.error(message)
          return rejectWithValue(message)
        }
      }
    )