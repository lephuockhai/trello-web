import Box from '@mui/material/Box'
import SelectMode from '../SelectMode'

function AppBar() {
  return (
    <Box sx={{
        bgcolor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems:'center'
      }}>
        <SelectMode />
    </Box>
  )
}

export default AppBar