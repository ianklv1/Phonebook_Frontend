import { Badge, Avatar } from '@mui/material'

const ImageBadge = ({ imageUrl }) => {
  return (
    <Badge
      overlap='circular'
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      badgeContent={
        imageUrl ? (
          <img
            src={imageUrl}
            alt='Profile Image'
            style={{
              width: 35,
              height: 35,
              borderRadius: '50%'
            }}
          />
        ) : (
          <Avatar
            alt='Default Avatar'
            sx={{
              width: 35,
              height: 35,
              backgroundColor: '#1976d2',
              color: '#fff'
            }}
          >
            U
          </Avatar>
        )
      }
    ></Badge>
  )
}

export default ImageBadge
