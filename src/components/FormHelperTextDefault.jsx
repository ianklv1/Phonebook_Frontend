import { FormHelperText } from '@mui/material'

const FormHelperTextDefault = ({ error }) => {
  return (
    <FormHelperText sx={{ color: 'error.main', fontSize: '0.75rem', fontWeight: 'normal', paddingLeft: 1 }}>
      {error}
    </FormHelperText>
  )
}

export default FormHelperTextDefault
