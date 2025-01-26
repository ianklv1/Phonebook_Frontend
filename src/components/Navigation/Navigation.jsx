import { useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button
} from '@mui/material'
// Material-UI icons
import { AccountBox, Menu as MenuIcon, Group, LibraryBooks, MenuBook } from '@mui/icons-material'
// Custom components
import AppDetail from '../AppDetail/AppDetail'
// React Router
import { NavLink } from 'react-router'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { bufferToFile } from '../../utils/file/file'
import ImageBadge from '../ImageBadge'

const drawerWidth = 240

const NavigationItems = [
  {
    text: 'Directory',
    link: '/phonebook',
    Icon: <LibraryBooks />,
    role: 'All'
  },
  {
    text: 'Profile',
    link: '/profile',
    Icon: <AccountBox />,
    role: 'All'
  },
  {
    text: 'User management',
    link: '/usermanagement',
    Icon: <Group />,
    role: 'Admin'
  },
  {
    text: 'Phonebook',
    link: '/phonebookmanage',
    Icon: <MenuBook />,
    role: 'User'
  }
]

const Navigation = props => {
  const { data: UserData } = useSelector(state => state.auth)
  const [profileImage, setProfileImage] = useState(null)
  const navigate = useNavigate()
  const { window, navTitle } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (UserData?.image?.data) {
      const file = bufferToFile(UserData?.image?.data?.data, UserData?.image?.contentType)
      setProfileImage(file) // Set the file state
    }
  }, [UserData?.image])

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const drawer = (
    <>
      <Toolbar sx={{ flexDirection: 'column' }}>
        <AppDetail size='h6' />
      </Toolbar>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, my: 3, ml: 5 }}>
        <ImageBadge imageUrl={profileImage && URL.createObjectURL(profileImage)} />
        <Typography
          variant='caption'
          fontWeight={'bold'}
          color='primary'
        >{`Welcome, ${UserData.firstName ?? 'User'}!`}</Typography>
      </Box>
      <Divider />
      <List>
        {NavigationItems.map(item => {
          if (item.role !== 'All' && item.role !== UserData?.roleName) {
            return
          }
          return (
            <ListItem key={item.text} disablePadding sx={{ width: '100%' }}>
              {/* Wrap NavLink around ListItemButton */}
              <NavLink
                to={item.link}
                style={{ textDecoration: 'none', width: '100%' }} // Ensure full width
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      width: '100%', // Full width for the button
                      backgroundColor: isActive ? 'primary.main' : 'transparent',
                      color: isActive ? 'white' : 'rgb(140, 86, 167)',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: isActive ? 'primary.main' : 'primary.light' // Active stays the same
                      },
                      paddingLeft: 2, // Adjust padding for consistency
                      paddingRight: 2
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? 'white' : 'inherit'
                      }}
                    >
                      {item.Icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          )
        })}
      </List>
      <Divider />
    </>
  )

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <Typography variant='h6' noWrap component='div'>
              {navTitle}
            </Typography>

            <Button
              size='small'
              variant='contained'
              color='secondary'
              startIcon={<LogoutIcon />}
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

export default Navigation
