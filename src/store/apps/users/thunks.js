import { createAsyncThunk } from '@reduxjs/toolkit'
import HttpClient from '../../../utils/http'

export const updateUser = createAsyncThunk('users/updateUser', async params => {
  const response = await HttpClient.put('/users/updateUser', params)

  return response.data
})

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const response = await HttpClient.get('/users/getAllUsers')

  return response.data
})

export const getUpdateUserById = createAsyncThunk('users/getUpdateUserById', async params => {
  const response = await HttpClient.get(`/users/getUserById/${params}`)

  return response.data
})
