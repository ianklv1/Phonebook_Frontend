import { createSlice } from '@reduxjs/toolkit'
import { loginUser, createUser, getUserById, forgotPassword, resetPassword } from './thunks'

const initialState = {
  data: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action?.payload?.data ?? {}
    })
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.data = action?.payload?.data ?? {}
    })
  }
})

export { loginUser, createUser, getUserById, forgotPassword, resetPassword }

export default authSlice.reducer
