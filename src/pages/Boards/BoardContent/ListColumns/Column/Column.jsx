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
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

function Column({column}) {
    /**
     * atteibutes:
     */
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging //value khi kéo đối tượng
    }= useSortable({id: column._id, data: {...column}})

    const dndKitColumnstyles = {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform), //nêú sử dụng Transform như docs sẽ bị lỗi stretch (kéo dài) component, Translate sẽ giải quyết vấn đề khi bị stretch 
        transition,
        // chiều cao phải luôn max vì nếu không khi kéo 1 column ngắn sang column dài sẽ bị giật và phải kết hợp listener ở trong box để không kéo nhầm từ vùng xanh của card
        height: '100%',
        opacity: isDragging ? 0.5 : undefined, // độ mờ object kéo thả
        border: isDragging ? '1px solid #48dbfb' : undefined
    }
    const [ anchorEl, setAnchorEl ] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget) }
    const handleClose = () => { setAnchorEl(null) }
    const orderedCard = mapOrder(column?.cards, column?.cardOrderIds, '_id')

    const [openCardForm, setOpenCardForm] = useState(false)
    const toggleOpenNewCardForm = () => {
        setOpenCardForm(!openCardForm)
    }
    const [newCardTitle, setNewCardTitle] = useState('')

    //arrow bắt event khi add title mà không có data trong input thì nó sẽ trả về rỗng,
    //còn nếu có data và nhấn add thì nó sẽ đóng button và clear input
    const addNewCard = () => {
        if(!newCardTitle) {
            toast.warning('Please enter card before Add new card', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
            

        toggleOpenNewCardForm()
        setNewCardTitle('')
    }

    return (
    //column
    // dùng div thuần là vì bị bug khi kéo 1 column chiều cao thấp hơn column khác sẽ bị giật

    <div
        ref={setNodeRef}
        style={ dndKitColumnstyles }
        {...attributes}
    > 
        <Box
        // để {...listeners} bên dưới box để khi chọn trong cái box này thì mới có thể kéo thả được
        {...listeners}
        sx={{
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
            height: (theme) => `${theme.trello.columnHeaderHeight}`,
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
                {column?.title}
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

            {/* list Card */}
            <ListCards cards={orderedCard} />

            {/* footer */}
            <Box 
            sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p:2
            }}
            >
                {!openCardForm
                ?
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Button startIcon={<AddCardIcon fontSize='small'/>} onClick={toggleOpenNewCardForm} >Add New card</Button>
                        <Tooltip title="Drag to move"><DragHandleIcon sx={{cursor: 'pointer'}} fontSize='small'/></Tooltip>
                    </Box>
                :
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <TextField 
                            label='Enter card title...'
                            type='text'
                            size='small'
                            variant='outlined'
                            autoFocus
                            data-no-dnd = 'true' // fix bug bôi đen text nhưng lại bị kéo cả column đi
                            value={newCardTitle}
                            onChange={event => setNewCardTitle(event.target.value)}
                            sx={{
                                '& label': { color: 'text.primary' },
                                '& input': {
                                    color: (theme) => theme.palette.primary.main,
                                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                                },
                                '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' }, //border white
                                    '&:hover fieldset': { borderColor: 'white' }, //border white
                                    '&.Mui-focused fieldset': { borderColor: 'white' },
                                },
                                '& .MuiOutlinedInput-input': {
                                    borderRadius: 1
                                }
                            }}
                        />

                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Button
                                onClick={addNewCard}
                                variant= 'contained'
                                color='success'
                                size='small'
                                data-no-dnd = 'true' // fix bug bôi đen text nhưng lại bị kéo cả column đi
                                sx={{
                                    boxShadow: 'none',
                                    border: ' 0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': { bgcolor: (theme) => theme.palette.success.main}
                                }}
                            >Add</Button>
                            <CloseIcon 
                                fontSize= 'small'
                                data-no-dnd = 'true' // fix bug bôi đen text nhưng lại bị kéo cả column đi
                                sx={{
                                    color: theme => theme.palette.warning.light,
                                    cursor: 'pointer'
                                }}
                                onClick = {toggleOpenNewCardForm}
                            />
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    </div>
  )
}

export default Column