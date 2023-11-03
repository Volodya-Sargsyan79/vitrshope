import { createSlice } from "@reduxjs/toolkit"

const toolkitSlice = createSlice({
    name: 'data',
    initialState: {
        coupon: {
              coupon_code: "",
              coupon_value: 0
            }
    },
    reducers: {
        useCoupon(state, action){
            state.coupon = action.payload
        }
    }
})

export default toolkitSlice.reducer
export const { useCoupon } = toolkitSlice.actions