import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResetPasswordValidation } from '../../../form/schemas'
import { Box, TextField, Button, Typography } from '@mui/material'
import FormHelperTextDefault from '../../../components/FormHelperTextDefault'
import { useState } from 'react'
import Note from '../../../components/Note'
import { useParams, useNavigate, Link } from 'react-router'
import { resetPassword } from '../../../store'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ResetPasswordForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const { id: paramId } = useParams()

  const defaultValues = {
    password: '',
    confirmPassword: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(ResetPasswordValidation)
  })

  const onSubmit = async data => {
    const res = await dispatch(resetPassword({ ...data, token: paramId }))

    if (res?.payload?.message) {
      toast.success('Password Successfully Changed')
      navigate('/login')
    } else {
      setMessage({
        text: res?.payload?.error,
        color: 'error'
      })
    }
    reset()
  }

  const PasswordField = ({ type, label, sx = null, autoComplete }) => {
    return (
      <Box sx={sx}>
        <Controller
          name={type} // Dynamically set the name for the input
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              fullWidth
              value={value}
              autoComplete={autoComplete}
              onChange={onChange}
              label={label}
              size='small'
              type='password' // Password visibility can be toggled if needed
              error={Boolean(errors?.[type])} // Access errors dynamically
            />
          )}
        />
        {errors[type] && <FormHelperTextDefault error={errors[type].message} />}
      </Box>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordField type='password' label={'New Password'} sx={{ mt: 1 }} autoComplete={'new-password'} />
        <PasswordField type='confirmPassword' label={'Confirm Password'} autoComplete={'new-password'} sx={{ mt: 1 }} />
        <Button fullWidth type='submit' variant='contained' sx={{ mt: 1 }}>
          Reset Password
        </Button>
        {message !== null && message !== undefined && <Note message={message?.text} type={message?.color} />}
      </form>
      <Typography variant='caption' sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Link to={'/login'}>Back to Login</Link>
      </Typography>
    </>
  )
}

export default ResetPasswordForm
