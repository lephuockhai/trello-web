import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Tooltip from '@mui/material/Tooltip'
import { IconButton } from '@mui/material'

function Profiles() {
    const [ anchorEl, setAnchorEl ] = React.useState(null)
    const open = Boolean(anchorEl) //
    const handleClick =  (event) => {
        setAnchorEl(event.currentTarget) //currentTarget lấy trạng thái event được kích hoạt
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: 'white'}}>
        <Tooltip title="Account settings">
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ padding:0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
                <Avatar 
                    alt='KhaxiDev'
                    src='https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D' 
                    sx={{ width: 36, height: 36 }}>KhaxiDev</Avatar>
            </IconButton>
        </Tooltip>

        <Menu
            id='basic-menu-profiles'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button-profiles'
            }}
        >
            <MenuItem>
                <Avatar sx={{ width: 28, height: 28, mr:2 }} /> Profile
            </MenuItem>

            <MenuItem>
                <Avatar sx={{ width: 28, height: 28, mr:2 }} /> My account
            </MenuItem>
            <Divider />

            <MenuItem>
                <ListItemIcon>
                    <PersonAddIcon fontSize='small'/>
                </ListItemIcon>
                Add another account
            </MenuItem>

            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize='small'/>
                </ListItemIcon>
                Setting
            </MenuItem>

            <MenuItem>
                <ListItemIcon>
                    <Logout fontSize='small'/>
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    </Box>
  )
}

export default Profiles