import { RouterProvider } from 'react-router-dom'
import AppRouter from './routes/AppRouter'

import { ThemeProvider, createTheme } from '@mui/material/styles'
// ** Global css styles

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#702C91'
    },
    secondary: {
      main: 'rgb(140, 86, 167)'
    },
    error: {
      main: '#d32f2f'
    }
  },
  typography: {
    fontFamily: 'PT Sans'
  }
}

const AppTheme = createTheme(themeOptions)

const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  )
}

export default App
