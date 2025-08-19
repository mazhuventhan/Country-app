import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice.js'
import countriesReducer from './features/countriesSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
  }
})
