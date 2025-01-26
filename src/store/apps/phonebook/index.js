import { createSlice } from '@reduxjs/toolkit'
import {
  createContacts,
  getAllContactByUserId,
  getContactById,
  updateContactById,
  deleteContactById,
  getAllSharedContacts
} from './thunks'

const initialState = {
  contactsByUserId: [],
  sharedContacts: [],
  modalActions: {
    contactModal: { id: null, isOpen: false, type: null, data: {} }
  }
}

export const phoneBookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    handleContactModal: (state, action) => {
      state.modalActions.contactModal = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllContactByUserId.fulfilled, (state, action) => {
      state.contactsByUserId = action?.payload?.data ?? []
    })
    builder.addCase(getContactById.fulfilled, (state, action) => {
      state.modalActions.contactModal = { ...state.modalActions.contactModal, data: action?.payload?.data ?? {} }
    })
    builder.addCase(getAllSharedContacts.fulfilled, (state, action) => {
      state.sharedContacts = action?.payload?.data ?? []
    })
  }
})
export const { handleContactModal } = phoneBookSlice.actions

export {
  createContacts,
  getAllContactByUserId,
  getContactById,
  updateContactById,
  deleteContactById,
  getAllSharedContacts
}

export default phoneBookSlice.reducer
