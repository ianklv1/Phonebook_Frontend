import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Avatar,
  IconButton,
  Badge,
  styled,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material'
import { PhotoCamera, Phone, Mail } from '@mui/icons-material'
import AuthLinkAndButton from '../../../components/Auth/AuthLinkAndButton'
import { LoginDetails } from './LoginForm'
import FormHelperTextDefault from '../../../components/FormHelperTextDefault'
import { SignUpValidation } from '../../../form/schemas'
import { createUser } from '../../../store'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

export const ImageForm = ({ viewOnly, contactImage, setContactImage }) => {
  const [error, setError] = useState(null) // State to handle error messages

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 4,
      bottom: 4,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: 0
    }
  }))

  const handleFileChange = event => {
    const file = event.target.files[0]

    if (file) {
      if (file.size > 1024 * 1024) {
        setError('File size must be 1MB or less')
        return
      }
      setError(null)
      setContactImage(file)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          !viewOnly && (
            <IconButton color='primary' component='label' sx={{ backgroundColor: 'white', ml: 0.5 }}>
              <PhotoCamera />
              <input hidden accept='image/*' type='file' onChange={handleFileChange} />
            </IconButton>
          )
        }
      >
        <Avatar src={contactImage} sx={{ width: 120, height: 120 }} />
      </StyledBadge>
      {error && <Box sx={{ color: 'red', mt: 3, fontSize: '0.875rem' }}>{error}</Box>}
    </Box>
  )
}

export const RoleSelect = ({ control, errors }) => {
  return (
    <Box>
      <Controller
        name='roleName'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControl size='small' fullWidth error={!!error}>
            <InputLabel>Role Select</InputLabel>
            <Select value={value} label='Role Select' size='small' onChange={onChange}>
              <MenuItem disabled value={''}>
                Select Role
              </MenuItem>
              <MenuItem value={'Admin'}>Admin</MenuItem>
              <MenuItem value={'User'}>User</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      {errors.roleName && <FormHelperTextDefault error={errors.roleName.message} />}
    </Box>
  )
}

export const SignUpDetails = ({ control, errors, viewOnly, getValues }) => {
  return (
    <>
      {viewOnly && getValues ? (
        <>
          <Typography variant='h4'>{`${getValues('firstName')} ${getValues('lastName')}`}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Phone />
            <Typography variant='h6'>{getValues('contactNumber')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Mail />
            <Typography variant='h6'>{getValues('emailAddress')}</Typography>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Controller
              name='firstName'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='First Name'
                  size='small'
                  error={Boolean(errors.firstName)}
                />
              )}
            />
            {errors.firstName && <FormHelperTextDefault error={errors.firstName.message} />}
          </Box>
          <Box>
            <Controller
              name='lastName'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='Last Name'
                  size='small'
                  error={Boolean(errors.lastName)}
                />
              )}
            />
            {errors.lastName && <FormHelperTextDefault error={errors.lastName.message} />}
          </Box>
          <Box>
            <Controller
              name='contactNumber'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='Contact Number'
                  size='small'
                  error={Boolean(errors.contactNumber)}
                />
              )}
            />
            {errors.contactNumber && <FormHelperTextDefault error={errors.contactNumber.message} />}
          </Box>
          <Box>
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
        </>
      )}
    </>
  )
}

const SignUpForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [contactImage, setContactImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    emailAddress: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(SignUpValidation)
  })

  const onSubmit = async data => {
    setLoading(true)
    const formData = new FormData()
    formData.append('contactImage', contactImage)
    formData.append('data', JSON.stringify(data))

    const res = await dispatch(
      createUser(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    )

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success('Account Created Successfully!')
    }
    setLoading(false)
    reset()
    setContactImage(null)
    if (!res?.payload?.error) {
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageForm contactImage={contactImage && URL.createObjectURL(contactImage)} setContactImage={setContactImage} />
      <LoginDetails control={control} errors={errors} />
      <Box sx={{ display: 'grid', my: 2, gap: 2 }}>
        <SignUpDetails control={control} errors={errors} />
      </Box>
      <AuthLinkAndButton state={'signup'} disabled={loading} />
    </form>
  )
}

export default SignUpForm
