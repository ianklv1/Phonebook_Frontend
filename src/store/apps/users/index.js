import { createSlice } from '@reduxjs/toolkit'
import { updateUser, getAllUsers, getUpdateUserById } from './thunks'

const initialState = {
  users: [],
  modalActions: {
    addUserModal: { id: null, isOpen: false, type: null, data: {} }
  }
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    handleAddUserModal: (state, action) => {
      state.modalActions.addUserModal = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action?.payload?.data ?? {}
    })
    builder.addCase(getUpdateUserById.fulfilled, (state, action) => {
      state.modalActions.addUserModal = { ...state.modalActions.addUserModal, data: action?.payload?.data ?? {} }
    })
  }
})

export const { handleAddUserModal } = usersSlice.actions

export { updateUser, getAllUsers, getUpdateUserById }

export default usersSlice.reducer
