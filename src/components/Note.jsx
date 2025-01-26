import { Typography, Box } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

const Note = ({ message, type }) => {
  return (
    <>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        {type === 'error' && <ErrorIcon sx={{ fontSize: 16 }} color={type} />}
        <Typography variant='caption' color={type}>
          {message}
        </Typography>
      </Box>
    </>
  )
}

export default Note
