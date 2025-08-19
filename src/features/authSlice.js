import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('auth_token'))
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true
      localStorage.setItem('auth_token', 'ok')
    },
    logout(state) {
      state.isAuthenticated = false
      localStorage.removeItem('auth_token')
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
