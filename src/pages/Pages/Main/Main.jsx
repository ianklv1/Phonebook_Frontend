import { Box, Toolbar } from '@mui/material'
import Navigation from '../../../components/Navigation/Navigation'
const Main = ({ children, navTitle }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation navTitle={navTitle} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Main
