import { configureStore } from '@reduxjs/toolkit'   
import cartSlice from './cartSlice' 
import productsSlice from './productsSlice'
import authSlice from './authSlice'


const store = configureStore({
    reducer :{
        auth: authSlice,
        cart:cartSlice,
        products:productsSlice
    }
})

export default store