import { useEffect } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Typography, Box, Button, Tooltip } from '@mui/material'
import { getAllUsers } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { PersonAddAlt, EditNote } from '@mui/icons-material'
import CustomToolbar from '../../../components/CustomToolbar'
import ConfirmationModal from '../../../components/ConfirmationModal'
import { updateUser, handleAddUserModal } from '../../../store'
import { toast } from 'react-toastify'
import UserModal from './Modals/UserModal'

const UserManagement = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)
  const { data: UserData } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const UserManagementColumns = [
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
      field: 'username',
      headerName: 'User Name',
      renderCell: params => {
        const { row } = params

        return (
          <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.username}
          </Typography>
        )
      }
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
          <Typography noWrap variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.lastName}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'contactNumber',
      headerName: 'Contact #',
      renderCell: params => {
        const { row } = params

        return (
          <Typography noWrap variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.contactNumber}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'emailAddress',
      headerName: 'Email Address',
      renderCell: params => {
        const { row } = params

        return (
          <Typography noWrap variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.emailAddress}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'isApproved',
      headerName: 'Approval Status',
      renderCell: params => {
        const { row } = params

        return (
          <>
            {row.isApprove ? (
              <Typography noWrap variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
                Approved
              </Typography>
            ) : (
              <ConfirmationModal
                label='Approve Sign up?'
                content='Are you sure you want to approve this signup?'
                dialogContentText='This action cannot be undone.'
                confirmButtonText='approve'
                callbackFn={() => handleApproveStatus(params.row.id)}
              >
                <Button sx={{ mb: 4 }} variant='contained' color='secondary' size='small'>
                  Approve
                </Button>
              </ConfirmationModal>
            )}
          </>
        )
      }
    },
    {
      field: 'deactivateActivate',
      type: 'actions',
      headerName: 'Deactivate/Activate',
      flex: 0.1,
      renderCell: params => {
        const { row } = params

        return (
          <>
            <Button
              variant='contained'
              color={row.isActive ? 'error' : 'success'}
              size='small'
              onClick={() => handleDeactivateUser(row.id, row.isActive)}
              sx={{ mt: 0.5 }}
            >
              {row.isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </>
        )
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.1,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <Tooltip key={'actionsEditUser'} title='Edit User' arrow>
            <GridActionsCellItem
              key={id}
              icon={<EditNote />}
              label='Edit'
              onClick={async () => {
                dispatch(handleAddUserModal({ type: 'edit', isOpen: true, id: id, data: {} }))
              }}
              color='inherit'
            />
          </Tooltip>
        ]
      }
    }
  ]

  const handleApproveStatus = async id => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('data', JSON.stringify({ isApprove: true }))

    const res = await dispatch(updateUser(formData))

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success('Approve Succesfully')
    }
    await dispatch(getAllUsers())
  }

  const handleDeactivateUser = async (id, active) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('data', JSON.stringify({ isActive: !active }))

    const res = await dispatch(updateUser(formData))

    if (res?.payload?.error) {
      toast.error(res?.payload?.error)
    } else {
      toast.success('Activation Status Changed Succesfully')
    }
    await dispatch(getAllUsers())
  }

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row-reverse' }}>
        <Button
          sx={{ mb: 2 }}
          variant='contained'
          color='primary'
          size='small'
          onClick={() => dispatch(handleAddUserModal({ type: 'add', isOpen: true, id: UserData._id, data: {} }))}
          startIcon={<PersonAddAlt />}
        >
          Add User
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
          rows={users ?? []}
          columns={UserManagementColumns}
          pageSizeOptions={[7, 10, 25, 50]}
          slots={{ toolbar: CustomToolbar }}
          disableColumnResize={true}
        />
      </Box>
      <UserModal />
    </>
  )
}

export default UserManagement
