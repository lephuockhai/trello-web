import { useState } from 'react'
import Box from '@mui/material/Box'
import SelectMode from '../SelectMode/SelectMode'
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
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        '&::-webkit-scrollbar-track': { m: 10 } //chinh kich thuoc thanh track cua scrollbar
      }}>
        <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
          <AppsIcon sx={{ color: 'white' }}/>
          <Box sx={{ display: 'flex', alignItems:'center', gap:0.5 }}>
            <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color: 'white' }}/>
            <Typography variant='span' sx={{ fontWeight: 'bold', fontSize: '1.3rem', color: 'white' }}>Trello</Typography>
          </Box>
          
          <Box sx={{ display: {xs:'none', md: 'flex'}, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              variant='outlined' 
              startIcon={<LibraryAddIcon />} 
              sx={{ 
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  color: 'white'
                }
              }}
            >
              Create
            </Button>
          </Box>

        </Box>
        <Box 
          sx=
          {{ 
            display: 'flex', 
            alignItems:'center', 
            gap:1 
          }}>
          <TextField 
            id='standard-search' 
            label='Search...' 
            type='text'
            size='small'
            value={searchValue}
            onChange={(event) => {setSearchValue(event.target.value)}} 
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon 
                  fontSize='small'
                  sx={{ 
                    color: searchValue ? 'white' : 'transparent',
                    cursor: searchValue ? 'pointer' : null
                  }} 
                  onClick = {() => setSearchValue('')}
                />
              )
            }}
            sx=
            {{ 
              minWidth: '100px',
              maxWidth: '170px',
              '& label': {color: 'white'},
              '& input': {color: 'white'},
              '& label.Mui-focused': {color: 'white'},
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' }, //border white
                '&:hover fieldset': { borderColor: 'white' }, //border white
                '&.Mui-focused fieldset': { borderColor: 'white' },
              }
            }} />
          <SelectMode />

          <IconButton>
            <Tooltip title="Notification">
              <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
                <NotificationsNoneIcon sx={{ color: 'white'}} />
              </Badge>
            </Tooltip>
          </IconButton>

          <IconButton>
            <Tooltip title= "Help">
              <HelpOutlineIcon sx={{ color: 'white'}} />
            </Tooltip>
          </IconButton>
          <Profiles />
        </Box>
    </Box>
  )
}

export default AppBar