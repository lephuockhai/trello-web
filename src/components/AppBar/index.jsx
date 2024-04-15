import Box from '@mui/material/Box'
import SelectMode from '../SelectMode'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
function AppBar() {
  return (
    <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
          <AppsIcon sx={{ color: 'primary.main' }}/>
          <Box sx={{ display: 'flex', alignItems:'center', gap:0.5 }}>
            <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color: 'primary.main' }}/>
            <Typography variant='span' sx={{ fontWeight: 'bold', fontSize: '1.3rem', color: 'primary.main' }}>Trello</Typography>
          </Box>
          
          <Box sx={{ display: {xs:'none', md: 'flex'}, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant='outlined' startIcon={<LibraryAddIcon />}>Create</Button>
          </Box>

        </Box>
        <Box sx={{ display: 'flex', alignItems:'center', gap:1 }}>
          <TextField id='standard-search' label='Search..' type='search' size='small' sx={{ minWidth: '120px' }} />
          <SelectMode />

          <IconButton>
            <Tooltip title="Notification">
              <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
                <NotificationsNoneIcon sx={{ color: 'primary.main'}} />
              </Badge>
            </Tooltip>
          </IconButton>

          <IconButton>
            <Tooltip title= "Help">
              <HelpOutlineIcon sx={{ color: 'primary.main'}} />
            </Tooltip>
          </IconButton>
          <Profiles />
        </Box>
    </Box>
  )
}

export default AppBar