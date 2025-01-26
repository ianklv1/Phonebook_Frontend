import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ForgotPasswordValidation } from '../../../form/schemas'
import { Box, TextField, Button, Typography } from '@mui/material'
import { generateToken } from '../../../utils/generateToken'
import FormHelperTextDefault from '../../../components/FormHelperTextDefault'
import { htmlString } from '../../../utils/PasswordResetHtml'
import { forgotPassword } from '../../../store'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Note from '../../../components/Note'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router'

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const defaultValues = {
    emailAddress: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(ForgotPasswordValidation)
  })

  const onSubmit = async data => {
    const forgotPasswordToken = generateToken(data.emailAddress)

    const dataToBeSent = {
      to: data.emailAddress,
      subject: 'Forgot Password Reset Link (Expires in 10 Minutes)',
      text: 'Password Reset Link.',
      html: htmlString(forgotPasswordToken)
    }

    const res = await dispatch(forgotPassword(dataToBeSent))

    if (res?.payload?.message) {
      toast.success('Email Sent Successfully')
      navigate('/login')
    } else {
      setMessage({
        text: res?.payload?.error,
        color: 'error'
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ mt: 2 }} variant='subtitle2'>
          Please Enter email registered in the application
        </Typography>
        <Box sx={{ mt: 1, mb: 2 }}>
          <Controller
            name='emailAddress'
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='Email Address'
                  size='small'
                  error={Boolean(errors.emailAddress)}
                />
              </>
            )}
          />
          {errors.emailAddress && <FormHelperTextDefault error={errors.emailAddress.message} />}
        </Box>
        <Button fullWidth type='submit' variant='contained' sx={{ mt: 1 }}>
          Submit Reset Password
        </Button>
        {message !== null && message !== undefined && <Note message={message?.text} type={message?.color} />}
      </form>
      <Typography variant='caption' sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Link to={'/login'}>Back to Login</Link>
      </Typography>
    </>
  )
}

export default ForgotPasswordForm
