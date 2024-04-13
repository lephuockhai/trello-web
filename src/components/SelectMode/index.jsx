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

export default SelectMode