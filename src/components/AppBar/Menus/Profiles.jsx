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
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ padding:0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 30, height: 30 }}>M</Avatar>
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