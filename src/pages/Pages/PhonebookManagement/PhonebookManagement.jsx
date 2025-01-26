import { useEffect } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Typography, Box, Button, Tooltip } from '@mui/material'
import { PersonAddAlt } from '@mui/icons-material'
import CustomToolbar from '../../../components/CustomToolbar'
import ContactModal from './Modals/ContactModal'
import { useDispatch, useSelector } from 'react-redux'
import { EditNote, Clear, Share } from '@mui/icons-material'
import { getAllContactByUserId, updateContactById, handleContactModal, deleteContactById } from '../../../store'
import ConfirmationModal from '../../../components/ConfirmationModal'

import { toast } from 'react-toastify'

const PhonebookManagement = () => {
  const phonebookColumns = [
    {
      flex: 0.1,
      field: 'id',
      headerName: 'Id',
      renderCell: params => {
        const { row } = params

        return (
          <Typography noWrap variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.id}
          </Typography>
        )
      },
      hide: true
    },
    {
      flex: 0.1,
      field: 'firstName',
      headerName: 'First Name',
      renderCell: params => {
        const { row } = params

        return (
          <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.firstName}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'lastName',
      headerName: 'Last Name',
      renderCell: params => {
        const { row } = params

        return (
          <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.lastName}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'contactNumber',
      headerName: 'Contact Number',
      renderCell: params => {
        const { row } = params

        return (
          <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.contactNumber}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'emailAddress',
      headerName: 'Email Address',
      renderCell: params => {
        const { row } = params

        return (
          <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.emailAddress}
          </Typography>
        )
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.175,
      minWidth: 120,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        return [
          <Tooltip key={'actionsEditContact'} title='Edit Contact' arrow>
            <GridActionsCellItem
              key={id}
              icon={<EditNote />}
              label='Edit'
              onClick={() => dispatch(handleContactModal({ type: 'edit', isOpen: true, id: id, data: {} }))}
              color='inherit'
            />
          </Tooltip>,
          <Tooltip key={'actionsShareContact'} title={row.isShared ? 'Shared' : 'Not Shared'} arrow>
            <GridActionsCellItem
              icon={<Share color={row.isShared ? 'primary' : 'primary.text'} />}
              label='Share'
              onClick={() => handleUpdateShareStatus(id, row.isShared)}
              color='inherit'
            />
          </Tooltip>,
          <ConfirmationModal
            key={'actionsConfirmEditContact'}
            label='Delete Contact'
            content='Are you sure you want to delete this contact?'
            dialogContentText='This action cannot be undone.'
            confirmButtonText='delete'
            callbackFn={() => handleDeleteByContactId(id)}
          >
            <GridActionsCellItem
              key={id}
              icon={<Clear />}
              label='Delete'
              onClick={() => handleDeleteByContactId(id)}
              color='inherit'
            />
          </ConfirmationModal>
        ]
      }
    }
  ]

  const dispatch = useDispatch()
  const { data: UserData } = useSelector(state => state.auth)
  const { contactsByUserId } = useSelector(state => state.phonebook)

  useEffect(() => {
    if (UserData?._id) {
      dispatch(getAllContactByUserId(UserData._id))
    }
  }, [dispatch, UserData])

  const handleDeleteByContactId = async id => {
    const res = await dispatch(deleteContactById(id))

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success('Contact Deleted Sucessfully')
    }

    await dispatch(getAllContactByUserId(UserData._id))
  }

  const handleUpdateShareStatus = async (id, isShared) => {
    const formData = new FormData()
    formData.append('contactId', id)
    formData.append('data', JSON.stringify({ isShared: !isShared }))

    const res = await dispatch(updateContactById(formData))

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success(!isShared ? 'Contact Shared Succesfully' : 'Contact Unshared Succesfully')
    }

    await dispatch(getAllContactByUserId(UserData._id))
  }

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row-reverse' }}>
        <Button
          sx={{ mb: 2 }}
          variant='contained'
          color='primary'
          size='small'
          onClick={() => dispatch(handleContactModal({ type: 'add', isOpen: true, id: UserData._id, data: {} }))}
          startIcon={<PersonAddAlt />}
        >
          Add Contact
        </Button>
      </Box>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          overflowX: 'auto', // Enable horizontal scrolling
          '& .MuiDataGrid-root': {
            padding: 2 // Padding inside the grid
          }
        }}
      >
        <DataGrid
          columnVisibilityModel={{
            id: false
          }}
          sx={{
            '& .MuiDataGrid-cell': {
              pt: 1,
              pb: 2
            }
          }}
          rows={contactsByUserId ?? []}
          columns={phonebookColumns}
          pageSizeOptions={[7, 10, 25, 50]}
          slots={{ toolbar: CustomToolbar }}
          disableColumnResize={true}
        />
      </Box>

      <ContactModal />
    </>
  )
}

export default PhonebookManagement
