import api from '../api';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createCart = createAsyncThunk(
'cart/create',
async (data, { rejectWithValue }) => {
    try {
    const response = await api.post(`/cart/create`,data)
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


export const updateCart = createAsyncThunk(
'cart/update',
async (data, { rejectWithValue }) => {
    try {
    const response = await api.put(`/cart/update/${data.cart_id}`,data);
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