import { createAsyncThunk } from '@reduxjs/toolkit'
import HttpClient from '../../../utils/http'

export const createContacts = createAsyncThunk('phonebook/addContacts', async (params, headers = null) => {
  const response = await HttpClient.post('/phonebook/addContacts', params, headers)

  return response.data
})

export const getAllContactByUserId = createAsyncThunk('phonebook/getAllContactByUserId', async params => {
  const response = await HttpClient.get(`/phonebook/getAllContactByUserId/${params}`)

  return response.data
})

export const getContactById = createAsyncThunk('phonebook/getContactById', async params => {
  const response = await HttpClient.get(`/phonebook/getContactById/${params}`)

  return response.data
})

export const updateContactById = createAsyncThunk('phonebook/updateContactById', async params => {
  const response = await HttpClient.put('/phonebook/updateContactById', params)

  return response.data
})

export const deleteContactById = createAsyncThunk('phonebook/deleteContactById', async params => {
  const response = await HttpClient.delete(`/phonebook/deleteContactById/${params}`)

  return response.data
})

export const getAllSharedContacts = createAsyncThunk('phonebook/getAllSharedContacts', async () => {
  const response = await HttpClient.get(`/phonebook/getAllSharedContacts`)

  return response.data
})
