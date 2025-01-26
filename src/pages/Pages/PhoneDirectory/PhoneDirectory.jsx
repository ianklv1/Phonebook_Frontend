import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Typography, Box, Tooltip } from '@mui/material'
import { getAllSharedContacts, handleContactModal } from '../../../store'
import { Preview } from '@mui/icons-material'
import CustomToolbar from '../../../components/CustomToolbar'
import ContactModal from '../PhonebookManagement/Modals/ContactModal'

const PhoneDirectory = () => {
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
      field: 'owner',
      headerName: 'Owner',
      renderCell: params => {
        const { row } = params

        // Accessing nested owner object properties
        const fullName = row.owner ? `${row.owner.firstName} ${row.owner.lastName}` : 'No Owner'

        return (
          <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {fullName}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'ownerEmailAddress',
      headerName: `Owner's email address`,
      renderCell: params => {
        const { row } = params

        return (
          <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.owner?.emailAddress}
          </Typography>
        )
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'See More',
      flex: 0.175,
      minWidth: 120,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <Tooltip key={'actionsViewmoreDetails'} title='View More Details' arrow>
            <GridActionsCellItem
              key={id}
              icon={<Preview />}
              label='View'
              onClick={() => dispatch(handleContactModal({ type: 'view', isOpen: true, id: id, data: {} }))}
              color='inherit'
            />
          </Tooltip>
        ]
      }
    }
  ]

  const dispatch = useDispatch()
  const { sharedContacts } = useSelector(state => state.phonebook)

  useEffect(() => {
    dispatch(getAllSharedContacts())
  }, [dispatch])

  return (
    <>
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
          rows={sharedContacts ?? []}
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

export default PhoneDirectory
