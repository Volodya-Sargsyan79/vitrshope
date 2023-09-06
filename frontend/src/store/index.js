import { combineReducers, configureStore } from '@reduxjs/toolkit'
import toolkitReducer from './reducer'


const rootReducer = combineReducers({
    data:toolkitReducer
})

export const store = configureStore({
    reducer:rootReducer
})