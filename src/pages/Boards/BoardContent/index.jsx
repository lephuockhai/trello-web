import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import CloudIcon from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function BoardContent() {
  const COLUMN_HEADER_HEIGHT = '50px'
  const COLUMN_FOOTER_HEIGHT = '56px'

  const [ anchorEl, setAnchorEl ] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  return (
    <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => (theme.trello.boardContentHeight),
        p: '10px 0'
      }}>

        <Box
          sx={{
            bgcolor: 'inherit',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            '&::-webkit-scrollbar-track': { m: 10 }
          }}
        >
          {/* box column 1*/}
          <Box sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
            {/* header */}
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                variant='h6'
              >
                Column Title
              </Typography>
              <Box>
                <Tooltip title= "More options">
                  <ExpandMoreIcon 
                    sx={{ color: 'text.primary', cursor: 'pointer'}}
                    id= 'basic-column-dropdown'
                    aria-controls= { open ? 'basic-menu-column-dropdown' : undefined }
                    aria-haspopup= 'true'
                    aria-expanded= { open ? 'true' : undefined }
                    onClick = { handleClick }
                  />
                </Tooltip>
                <Menu
                  id='basic-menu-column-dropdown'
                  anchorEl={ anchorEl }
                  open= { open }
                  onClose={ handleClose }
                  MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon><AddCardIcon fontSize='small'/></ListItemIcon>
                    <ListItemText>Add New Card</ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon><ContentCut fontSize='small'/></ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCopy fontSize='small'/></ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentPaste fontSize='small'/></ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>

                  <Divider />
                  <MenuItem>
                    <ListItemIcon><DeleteIcon fontSize='small' /></ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><CloudIcon fontSize='small' /></ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* list */}
            <Box sx={{
              p: ' 0 5px',
              m: ' 0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
                ${theme.trello.boardContentHeight} -
                ${theme.spacing(5)} -
                ${COLUMN_FOOTER_HEIGHT} - 
                ${COLUMN_HEADER_HEIGHT}
              )`,
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
            }} 
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardMedia 
                  sx={{ height: 150 }}
                  image='https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D'
                  title= 'Avatar'
                />
                <CardContent
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Khaxi dev</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon />}>20</Button>
                  <Button size="small" startIcon={<CommentIcon />}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
                </CardActions>
              </Card>

              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>

            </Box>

            {/* footer */}
            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon fontSize='small'/>}>Add New card</Button>
              <Tooltip title="Drag to move"><DragHandleIcon fontSize='small'/></Tooltip>
            </Box>
          </Box>
          {/* box column 2 */}
          <Box sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
            {/* header */}
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                variant='h6'
              >
                Column Title
              </Typography>
              <Box>
                <Tooltip title= "More options">
                  <ExpandMoreIcon 
                    sx={{ color: 'text.primary', cursor: 'pointer'}}
                    id= 'basic-column-dropdown'
                    aria-controls= { open ? 'basic-menu-column-dropdown' : undefined }
                    aria-haspopup= 'true'
                    aria-expanded= { open ? 'true' : undefined }
                    onClick = { handleClick }
                  />
                </Tooltip>
                <Menu
                  id='basic-menu-column-dropdown'
                  anchorEl={ anchorEl }
                  open= { open }
                  onClose={ handleClose }
                  MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon><AddCardIcon fontSize='small'/></ListItemIcon>
                    <ListItemText>Add New Card</ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon><ContentCut fontSize='small'/></ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCopy fontSize='small'/></ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentPaste fontSize='small'/></ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>

                  <Divider />
                  <MenuItem>
                    <ListItemIcon><DeleteIcon fontSize='small' /></ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><CloudIcon fontSize='small' /></ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* list */}
            <Box sx={{
              p: ' 0 5px',
              m: ' 0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
                ${theme.trello.boardContentHeight} -
                ${theme.spacing(5)} -
                ${COLUMN_FOOTER_HEIGHT} - 
                ${COLUMN_HEADER_HEIGHT}
              )`,
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
            }} 
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardMedia 
                  sx={{ height: 150 }}
                  image='https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D'
                  title= 'Avatar'
                />
                <CardContent
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Khaxi dev</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon />}>20</Button>
                  <Button size="small" startIcon={<CommentIcon />}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
                </CardActions>
              </Card>

              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent 
                  sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                  <Typography>Card</Typography>
                </CardContent>
              </Card>
            </Box>

            {/* footer */}
            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon fontSize='small'/>}>Add New card</Button>
              <Tooltip title="Drag to move"><DragHandleIcon fontSize='small'/></Tooltip>
            </Box>
          </Box>
        
        </Box>
    </Box>
  )
}

export default BoardContent