import SignUpModal from '../../../../components/SignUpModal'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { UpdateValidation } from '../../../../form/schemas'
import { createContacts, handleContactModal, getContactById, updateContactById } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllContactByUserId } from '../../../../store'
import { bufferToFile } from '../../../../utils/file/file'

const ContactModal = () => {
  const dispatch = useDispatch()
  const { data: UserData } = useSelector(state => state.auth)
  const [contactId, setContactId] = useState(null)
  const [contactImage, setContactImage] = useState(null)
  const {
    data: ContactModalData,
    type: ContactModalType,
    id: ContactModalId,
    isOpen: ContactModalIsOpen
  } = useSelector(state => state.phonebook.modalActions.contactModal)
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    emailAddress: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(UpdateValidation)
  })

  useEffect(() => {
    if ((ContactModalType === 'edit' || ContactModalType === 'view') && ContactModalId) {
      setContactId(ContactModalId)
    }
  }, [ContactModalType, ContactModalId])

  useEffect(() => {
    if (contactId) {
      setLoading(true)
      dispatch(getContactById(contactId)).finally(() => {
        setLoading(false)
      })
    }
  }, [contactId, dispatch])

  useEffect(() => {
    if (ContactModalData) {
      const file = bufferToFile(ContactModalData?.image?.data?.data, ContactModalData?.image?.contentType)
      setContactImage(file) // Set the file state
      reset(ContactModalData, { keepValues: false, keepDefaultValues: true })
    }
  }, [ContactModalData, reset])

  const onSubmit = async data => {
    setLoading(true)
    const formData = new FormData()

    formData.append('contactImage', contactImage)

    if (ContactModalType === 'edit') {
      formData.append('data', JSON.stringify({ ...data, owner: UserData._id }))
      formData.append('contactId', contactId)
    } else {
      formData.append('data', JSON.stringify({ ...data, owner: UserData._id }))
    }

    const res = await dispatch(
      ContactModalType === 'edit'
        ? updateContactById(formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        : createContacts(formData)
    )

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success(ContactModalType === 'edit' ? 'Contact Updated Successfully' : 'Contact Added Successfully!')
    }
    await dispatch(getAllContactByUserId(UserData._id))
    setLoading(false)
    handleResetAndClose()
  }

  const handleClose = () => {
    dispatch(handleContactModal({ id: null, type: null, isOpen: false, data: {} }))
    setContactId(null)
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
        open={ContactModalIsOpen}
        disabled={loading}
        addContact={true}
        modalTitle={ContactModalType === 'edit' ? 'Edit Contacts' : 'Add Contacts'}
        viewOnly={ContactModalType === 'view'}
        getValues={ContactModalType === 'view' && getValues}
      />
    </>
  )
}

export default ContactModal
