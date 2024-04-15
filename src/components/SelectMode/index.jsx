import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

function SelectMode () {
  const {mode, setMode} = useColorScheme()
  const handleChange = (event) => {
    setMode(event.target.value)
  }
  return (
    <FormControl size='small' sx={{ minWidth: '120px' }}>
      <InputLabel id="select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId = "select-dark-light-mode"
        id="dark-light-mode"
        value={mode}
        label='Mode'
        onChange={handleChange}
      >
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon />Dark
          </Box>
        </MenuItem>
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon />Light
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon />System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectMode