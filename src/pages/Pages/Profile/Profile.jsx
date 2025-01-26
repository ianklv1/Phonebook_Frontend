import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid2 as Grid, Button } from '@mui/material'
import { ImageForm, SignUpDetails } from '../../Auth/Forms/SignUpForm.jsx'
import { useForm } from 'react-hook-form'
import { UpdateValidation } from '../../../form/schemas.js'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { bufferToFile } from '../../../utils/file/file.js'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateUser, getUserById } from '../../../store'

const Profile = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [newProfileImage, setNewProfileImage] = useState(null)
  const { data: UserData } = useSelector(state => state.auth)

  const defaultValues = {
    firstName: UserData.firstName,
    lastName: UserData.lastName,
    contactNumber: UserData.contactNumber,
    emailAddress: UserData.emailAddress
  }

  useEffect(() => {
    if (UserData?.image?.data) {
      const file = bufferToFile(UserData?.image?.data?.data, UserData?.image?.contentType)
      setProfileImage(file) // Set the file state
    }
  }, [UserData?.image])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(UpdateValidation)
  })

  const onSubmit = async data => {
    setLoading(true)
    const formData = new FormData()
    if (newProfileImage) {
      formData.append('contactImage', newProfileImage)
    }
    formData.append('id', UserData._id)
    formData.append('data', JSON.stringify(data))

    const res = await dispatch(updateUser(formData))

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success('Profile Successfully Updated!')
    }
    await dispatch(getUserById(UserData._id))
    setLoading(false)
    setNewProfileImage(null)
  }

  return (
    <>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid size={12}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ImageForm
                  setContactImage={setNewProfileImage}
                  contactImage={
                    newProfileImage
                      ? URL.createObjectURL(newProfileImage)
                      : profileImage && URL.createObjectURL(profileImage)
                  }
                />
                <Box sx={{ display: 'grid', my: 2, gap: 2 }}>
                  <SignUpDetails control={control} errors={errors} />
                </Box>
                <Button fullWidth type='submit' variant='contained' sx={{ mt: 1 }} disabled={loading}>
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Profile
