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

export const fetchProduct = createAsyncThunk('product/fetchProduct', () => {
    return axios
        .get('http://localhost:8000/api/product?format=json')
        .then((response) => response.data)
})

const menuSlice = createSlice({
    name: 'dara',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fatchNavBar.fulfilled, (state, action) => {
            state.menu = action.payload
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload
        })
    }
})

export default menuSlice.reducer