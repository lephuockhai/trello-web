import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DashBoardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const MENUS_STYLE = {
  color:'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar() {
  return (
    <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5'
      }}>
        <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
          <Chip
            sx={ MENUS_STYLE }
            icon={<DashBoardIcon />} 
            label="KhaxiDev Study MERN Stack"
            clickable
          />

          <Chip
            sx={ MENUS_STYLE }
            icon={<VpnLockIcon />} 
            label="Public/Private Workspace"
            clickable
          />

          <Chip
            sx={ MENUS_STYLE }
            icon={<AddToDriveIcon />} 
            label="Add To Google Drive"
            clickable
          />

          <Chip
            sx={ MENUS_STYLE }
            icon={<BoltIcon />} 
            label="Automation"
            clickable
          />

          <Chip
            sx={ MENUS_STYLE }
            icon={<FilterListIcon />} 
            label="Filter"
            clickable
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
          <Button variant='outlined' startIcon={<PersonAddIcon />} >Invite</Button>
          <AvatarGroup 
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16
            }
          }}
          max={4}
          >
            <Tooltip title= "KhaxiDev">
              <Avatar 
              alt="KhaxiDev" 
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D" />
            </Tooltip>

            <Tooltip title= "KhaxiDev">
              <Avatar 
              alt="KhaxiDev" 
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D" />
            </Tooltip>

            <Tooltip title= "KhaxiDev">
              <Avatar 
              alt="KhaxiDev" 
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D" />
            </Tooltip>

            <Tooltip title= "KhaxiDev">
              <Avatar 
              alt="KhaxiDev" 
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D" />
            </Tooltip>

            <Tooltip title= "KhaxiDev">
              <Avatar 
              alt="KhaxiDev" 
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D" />
            </Tooltip>
          </AvatarGroup>
        </Box>
    </Box>
  )
}

export default BoardBar