import { useState } from 'react'
import { Box, TextField, InputAdornment, IconButton, Typography } from '@mui/material'
import { AccountCircle, Key } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import AuthLinkAndButton from '../../../components/Auth/AuthLinkAndButton'
import FormHelperTextDefault from '../../../components/FormHelperTextDefault'
import { loginUser } from '../../../store'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Note from '../../../components/Note'

export const LoginDetails = ({ control, errors = null }) => {
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev) // Toggle the visibility of the password
  }

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Controller
          name='username'
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle color='primary' />
                    </InputAdornment>
                  )
                }
              }}
              fullWidth
              value={value}
              onChange={onChange}
              label='Username'
              size='small'
              error={Boolean(errors?.username)}
            />
          )}
        />
        {errors?.username && <FormHelperTextDefault error={errors.username.message} />}
      </Box>
      <Box>
        <Controller
          name='password'
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Key color='primary' />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword} edge='end' aria-label='toggle password visibility'>
                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* Show/hide icon */}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              fullWidth
              value={value}
              onChange={onChange}
              label='Password'
              size='small'
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              error={Boolean(errors?.password)}
            />
          )}
        />
        {errors?.password && <FormHelperTextDefault error={errors.password.message} />}
      </Box>
    </>
  )
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const defaultValues = {
    username: '',
    password: ''
  }

  const onSubmit = async data => {
    setLoading(true)
    const res = await dispatch(loginUser(data))

    const token = res?.payload?.token
    if (token) {
      localStorage.setItem('userToken', token)
      setLoading(false)
      navigate('/profile')
    } else {
      setLoading(false)
      setErrorMessage(res?.payload?.error)
    }
  }

  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginDetails control={control} />
        <AuthLinkAndButton state={'login'} disabled={loading} />
        {errorMessage !== '' && errorMessage !== null && errorMessage !== undefined && (
          <Note message={errorMessage} type='error' />
        )}
      </form>
      <Typography variant='caption' sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Link to={'/forgotpassword'}>Forgot Password?</Link>
      </Typography>
    </>
  )
}

export default LoginForm
