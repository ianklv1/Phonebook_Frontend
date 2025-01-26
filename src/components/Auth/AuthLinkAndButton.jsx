import { Typography, Button } from '@mui/material'
import { Link } from 'react-router'

const AuthLinkAndButton = ({ state, disabled = false }) => {
  return (
    <>
      <Typography variant='caption'>
        {state === 'login' ? 'Not yet registered?' : 'Already have an Account?'}{' '}
        <Link to={`/${state === 'login' ? 'signup' : 'login'}`}>{state === 'login' ? 'Sign Up' : 'Log In'} </Link>
      </Typography>
      <Button fullWidth type='submit' variant='contained' sx={{ mt: 1 }} disabled={disabled}>
        {state}
      </Button>
    </>
  )
}

export default AuthLinkAndButton
