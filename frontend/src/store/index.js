import { combineReducers, configureStore } from '@reduxjs/toolkit'
import apiReducer from './reducerApi'
import toolkitSlice from './reducer'


const rootReducer = combineReducers({
    data:apiReducer,
    coupon:toolkitSlice
})

export const store = configureStore({
    reducer:rootReducer
})