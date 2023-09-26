import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    menu: [],
    product: [],
}

export const fatchNavBar = createAsyncThunk('menu/fatchNavBar', () => {
    return axios
        .get('http://localhost:8000/api/category?format=json')
        .then((response) => response.data)
})

export const fetchCart = createAsyncThunk('cart/fetchCart', () => {
    return axios
        .get('/api/cart_detail')
        .then((response) => response.data)
})

const menuSlice = createSlice({
    name: 'dara',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fatchNavBar.fulfilled, (state, action) => {
            state.menu = action.payload
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.product = action.payload
        })
    }
})

export default menuSlice.reducer