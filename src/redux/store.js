import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import countriesReducer from './countriesSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer
  }
})
