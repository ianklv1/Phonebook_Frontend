import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ImageForm, SignUpDetails, RoleSelect } from '../pages/Auth/Forms/SignUpForm'
import { LoginDetails } from '../pages/Auth/Forms/LoginForm'

const SignUpModal = ({
  handleClose,
  control,
  errors,
  profileImage,
  setProfileImage,
  open,
  onSubmit,
  disabled,
  addContact = false,
  modalTitle,
  viewOnly = false,
  getValues = false
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        {!viewOnly && <DialogTitle id='responsive-dialog-title'>{modalTitle}</DialogTitle>}
        <form onSubmit={onSubmit}>
          <DialogContent sx={viewOnly && !fullScreen ? { width: '300px' } : { px: 10 }}>
            <ImageForm
              viewOnly={viewOnly}
              setContactImage={setProfileImage}
              contactImage={profileImage && URL.createObjectURL(profileImage)}
            />
            {!addContact && <LoginDetails control={control} errors={errors} />}
            <Box sx={{ display: 'grid', my: 3, gap: 2 }}>
              <SignUpDetails viewOnly={viewOnly} control={control} errors={errors} getValues={getValues} />
              {!addContact && <RoleSelect control={control} errors={errors} />}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color='error' onClick={handleClose}>
              {viewOnly ? 'Close' : 'Cancel'}
            </Button>
            {!viewOnly && (
              <Button color='primary' type='submit' disabled={disabled}>
                Submit
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default SignUpModal
