import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'

//Pages
import Auth from '../pages/Auth/Auth'
import Main from '../pages/Pages/Main/Main'
import Profile from '../pages/Pages/Profile/Profile'
import UserManagement from '../pages/Pages/UserManagement/UserManagement'
import PhoneDirectory from '../pages/Pages/PhoneDirectory/PhoneDirectory'
import PhonebookManagement from '../pages/Pages/PhonebookManagement/PhonebookManagement'
import HttpClient from '../utils/http'

const isAuthenticated = async () => {
  const response = await HttpClient.get('/auth/validatetoken')

  if (response.status !== 200) {
    return { authenticated: false }
  }

  return { authenticated: true, role: response.data.roleName }
}

const requireAuth = async (allowedRoles = []) => {
  const { authenticated, role } = await isAuthenticated()

  if (!authenticated) {
    throw redirect('/login')
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    throw redirect('/unauthorized')
  }

  return null
}

const checkAuthOnLogin = async () => {
  const { authenticated } = await isAuthenticated()
  if (authenticated) {
    throw redirect('/profile')
  }
  return null
}

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route index element={<Auth state={'login'} />} loader={checkAuthOnLogin} />
      <Route path='login' element={<Auth state={'login'} />} loader={checkAuthOnLogin} />
      <Route path='signup' element={<Auth state={'signup'} />} loader={checkAuthOnLogin} />
      <Route path='forgotpassword' element={<Auth state={'forgotpassword'} />} loader={checkAuthOnLogin} />
      <Route path='forgotpassword/:id' element={<Auth state={'resetpassword'} />} loader={checkAuthOnLogin} />
      {/* Protected Routes */}
      <Route
        path='profile'
        element={
          <Main navTitle={'Profile Management'}>
            <Profile />
          </Main>
        }
        loader={requireAuth}
      />
      <Route
        path='usermanagement'
        element={
          <Main navTitle={'User Management'}>
            <UserManagement />
          </Main>
        }
        loader={() => requireAuth(['Admin'])}
      />

      <Route
        path='phonebook'
        element={
          <Main navTitle={'Phone Directory'}>
            <PhoneDirectory />
          </Main>
        }
        loader={requireAuth}
      />

      <Route
        path='phonebookmanage'
        element={
          <Main navTitle={'Phonebook Management'}>
            <PhonebookManagement />
          </Main>
        }
        loader={() => requireAuth(['User'])}
      />
    </Route>
  )
)

export default AppRouter
