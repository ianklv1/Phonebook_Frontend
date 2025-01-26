import SignUpModal from '../../../../components/SignUpModal'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SignUpValidation } from '../../../../form/schemas'
import { createUser, handleAddUserModal } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllUsers, getUpdateUserById, updateUser } from '../../../../store'
import { bufferToFile } from '../../../../utils/file/file'

import * as yup from 'yup'

const UserModal = () => {
  const dispatch = useDispatch()
  const {
    data: UserModalData,
    type: UserModalType,
    id: UserModalId,
    isOpen: UserModalIsOpen
  } = useSelector(state => state.users.modalActions.addUserModal)
  const [contactImage, setContactImage] = useState(null)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    emailAddress: '',
    roleName: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(
      SignUpValidation.shape({
        roleName: yup.string().required('Please select an option')
      })
    )
  })

  useEffect(() => {
    if (UserModalType === 'edit' && UserModalId) {
      setUserId(UserModalId)
    }
  }, [UserModalType, UserModalId])

  useEffect(() => {
    if (userId) {
      setLoading(true)
      dispatch(getUpdateUserById(userId)).finally(() => {
        setLoading(false)
      })
    }
  }, [userId, dispatch])

  useEffect(() => {
    if (UserModalData) {
      const file = bufferToFile(UserModalData?.image?.data?.data, UserModalData?.image?.contentType)
      setContactImage(file) // Set the file state
      reset(UserModalData, { keepValues: false, keepDefaultValues: true })
    }
  }, [UserModalData, reset])

  const onSubmit = async data => {
    setLoading(true)
    const formData = new FormData()

    formData.append('contactImage', contactImage)
    formData.append('data', JSON.stringify(data))
    if (UserModalType === 'edit') {
      formData.append('id', userId)
    }

    const res = await dispatch(
      UserModalType === 'edit'
        ? updateUser(formData)
        : createUser(formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    )

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success(`${UserModalType === 'edit' ? 'Account Updated Successfully' : 'Account Created Successfully!'}`)
    }
    await dispatch(getAllUsers())
    setLoading(false)
    handleResetAndClose()
  }

  const handleClose = () => {
    dispatch(handleAddUserModal({ id: null, type: null, isOpen: false, data: {} }))
    setUserId(null)
  }

  const handleResetAndClose = () => {
    handleClose()
    reset()
    setContactImage(null)
  }

  return (
    <>
      <SignUpModal
        onSubmit={handleSubmit(onSubmit)}
        handleClose={handleResetAndClose}
        control={control}
        errors={errors}
        profileImage={contactImage}
        setProfileImage={setContactImage}
        open={UserModalIsOpen}
        disabled={loading}
        modalTitle={UserModalType === 'add' ? 'Add Users' : 'Edit Users'}
      />
    </>
  )
}

export default UserModal
