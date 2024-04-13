
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box'
import { Container } from '@mui/material';

function SelectMode () {
  const {mode, setMode} = useColorScheme()
  const handleChange = (event) => {
    setMode(event.target.value)
  }
  return (
    <FormControl sx={{m: '1', minWidth:"120"}} size='small'>
      <InputLabel id="select-dark-light-mode"></InputLabel>
      <Select
        labelId = "select-dark-light-mode"
        id="dark-light-mode"
        value={mode}
        label="Mode"
        name='Mode'
        onChange={handleChange}
      >
        <MenuItem value="dark">
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <DarkModeIcon /> Dark Mode
          </div>
        </MenuItem>
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon /> Light Mode
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon /> System Mode
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', bgcolor: 'primary.main'}}>
      <Box sx={{
        bgcolor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems:'center'
      }}>
        <SelectMode />
      </Box>
      <Box sx={{
        bgcolor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems:'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        bgcolor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems:'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default App
