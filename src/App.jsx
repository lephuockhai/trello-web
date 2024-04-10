
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
function App() {

  return (
    <>
      <div>KhaxiDev</div>

      <Typography variant='body2' color='text.secondary'> test Typography</Typography>

      <Button variant='text'>Text</Button>
      <Button variant="contained" color='success'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
      <br/>
      <HomeIcon/>
      <HomeIcon color='primary' />
      <HomeIcon color='secondery' />
      <HomeIcon color='success' />
      <HomeIcon color='action' />
      <HomeIcon color='disabled' />
      <HomeIcon sx={{color: pink[500]}} />
    </>
  )
}

export default App
