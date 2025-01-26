import { Card, CardContent, Grid2 as Grid, Box } from '@mui/material'
import AppDetail from '../../components/AppDetail/AppDetail'

import LoginForm from './Forms/LoginForm'
import SignUpForm from './Forms/SignUpForm'
import ForgotPasswordForm from './Forms/ForgotPasswordForm'
import ResetPasswordForm from './Forms/ResetPasswordForm'

const Auth = props => {
  const { state } = props
  return (
    <Grid
      container
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Card>
        <CardContent>
          <AppDetail />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {state === 'signup' ? (
              <SignUpForm />
            ) : state === 'login' ? (
              <LoginForm />
            ) : state === 'forgotpassword' ? (
              <ForgotPasswordForm />
            ) : (
              <ResetPasswordForm />
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Auth
