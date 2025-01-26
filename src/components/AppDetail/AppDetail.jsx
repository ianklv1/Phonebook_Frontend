import { Typography } from '@mui/material'

const AppDetail = ({ size = null }) => {
  return (
    <>
      <Typography variant={size ?? 'h4'} fontWeight='bold' color='primary'>
        MedImpact
      </Typography>
      <Typography variant='caption'>Phonebook System</Typography>
    </>
  )
}

export default AppDetail
