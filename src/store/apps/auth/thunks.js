import { createAsyncThunk } from '@reduxjs/toolkit'
import HttpClient from '../../../utils/http'

export const loginUser = createAsyncThunk('auth/login', async params => {
  const response = await HttpClient.post('/auth/login', params)

  return response.data
})

export const createUser = createAsyncThunk('auth/signup', async (params, headers = null) => {
  const response = await HttpClient.post('/auth/signup', params, headers)

  return response.data
})

export const getUserById = createAsyncThunk('users/getUserById', async params => {
  const response = await HttpClient.get(`/users/getUserById/${params}`)

  return response.data
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async params => {
  const response = await HttpClient.post('/auth/forgotPassword', params)

  return response.data
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async params => {
  const response = await HttpClient.post('/auth/resetPassword', params)

  return response.data
})
