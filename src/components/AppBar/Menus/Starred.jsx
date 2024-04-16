import React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckIcon from '@mui/icons-material/Check'
import Divider from '@mui/material/Divider'


function Starred() {
    const [ anchorEl, setAnchorEl ] = React.useState(null)
    const open = Boolean(anchorEl) //
    const handleClick =  (event) => {
        setAnchorEl(event.currentTarget) //currentTarget lấy trạng thái event được kích hoạt
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

  return (
    <Box>
        <Button
            sx={{ color: 'white'}}
            id='basic-button-starred'
            aria-controls={open ? 'basic-menu-starred' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon= {<ExpandMoreIcon />}
        >
            Starred
        </Button>

        <Menu
            id='basic-menu-starred'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button-starred'
            }}
        >
            <MenuItem>
                <ListItemText inset>Single</ListItemText>
            </MenuItem>

            <MenuItem>
                <ListItemText inset>1.5</ListItemText>
            </MenuItem>

            <MenuItem>
                <ListItemText inset>Douple</ListItemText>
            </MenuItem>

            <MenuItem>
                <ListItemIcon>
                    <CheckIcon />
                </ListItemIcon>
                Custom: 1.2
            </MenuItem>
            <Divider />

            <MenuItem>
                <ListItemText>Add space before paragraph</ListItemText>
            </MenuItem>

            <MenuItem>
                <ListItemText>Add space after paragraph</ListItemText>
            </MenuItem>

            <Divider />
            <MenuItem>
                <ListItemText>Custom spacing...</ListItemText>
            </MenuItem>
        </Menu>
    </Box>
  )
}

export default Starred