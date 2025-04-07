import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[]
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {


    addToCart:(state,action)=>{
        state.products.push(action.payload)
    },
    removeFromCart:(state,action)=>{
        state.products=state.products.filter((product)=>product.id!==action.payload)
    }
   
   
  },
})

// Action creators are generated for each case reducer function
export const { addToCart,removeFromCart } = productSlice.actions

export default productSlice.reducer