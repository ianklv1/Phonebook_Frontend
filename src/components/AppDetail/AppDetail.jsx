import { Typography } from '@mui/material'

const AppDetail = ({ size = null }) => {
  return (
    <>
      <Typography variant={size ?? 'h5'} fontWeight='bold'>
        Phone Book System
      </Typography>
      <Typography variant='caption'>Powered by MedImpact</Typography>
    </>
  )
}

export default AppDetail
