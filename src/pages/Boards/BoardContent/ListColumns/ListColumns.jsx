// contained columns in a board
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

function ListColumns({ columns, createNewColumn, createNewCard, deleteColumn }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')


  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.warning('please enter column before Add new column', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      return
    }

    // create data to call api
    const newColumnData = {
      title: newColumnTitle
    }

    createNewColumn(newColumnData)

    // call api to save column in here!!!!!!..  

    // close trạng thái khi thêm column và clear input
    toggleOpenNewColumnForm() // close card component
    setNewColumnTitle('') //clear input

  }
  return (
    // vi list column nam ngang nen chon strategy = horizontal
    <SortableContext items={columns?.map((c)=> c._id)} strategy={horizontalListSortingStrategy}>
      <Box
          sx={{
            bgcolor: 'inherit',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            '&::-webkit-scrollbar-track': { m: 2 }
          }}
          >
            {columns?.map(column => <Column 
              key={column._id} 
              column={column} 
              createNewCard = {createNewCard} 
              deleteColumn = { deleteColumn }
              />
            )}

            {!openNewColumnForm
              ? <Box onClick = {toggleOpenNewColumnForm} sx={{
                minWidth: '250px',
                maxWidth: '250px',
                borderRadius: '6px',
                mx: 2,
                height: 'fit-content',
                bgcolor: '#ffffff3d'
              }}>
                <Button 
                  sx={{
                    color: 'white',
                    width: '100%',
                    justifyContent: 'flex-start',
                    pl: 2.5,
                    py: 1
                  }}
                  startIcon={<NoteAddIcon />}
                >
                  Add New Column
                </Button>
              </Box>
              : <Box 
                sx= {{
                  minWidth: '250px',
                  maxWidth: '250px',
                  mx: 2,
                  p: 1,
                  borderRadius: '6px',
                  height: 'fit-content',
                  bgcolor: '#fffff3d',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  '&:hover': { color: (theme) => theme.palette.primary.main}
                }}
              >
                <TextField 
                  label='Enter Column Title...' 
                  type='text'
                  size='small'
                  variant='outlined'
                  autoFocus
                  value={newColumnTitle}
                  onChange={(event) => {setNewColumnTitle(event.target.value)}} 
                  sx=
                  {{
                    '& label': {color: 'white'},
                    '& input': {color: 'white'},
                    '& label.Mui-focused': {color: 'white'},
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' }, //border white
                      '&:hover fieldset': { borderColor: 'white' }, //border white
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    }
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Button
                    onClick={addNewColumn}
                    variant= 'contained'
                    color='success'
                    size= 'small'
                    sx={{
                      boxShadow: 'none',
                      border: ' 0.5px solid',
                      borderColor: (theme) => theme.palette.success.main,
                      '&:hover': { bgcolor: (theme) => theme.palette.success.main}
                    }}
                  >
                    Add Column
                  </Button>
                  <CloseIcon 
                    fontSize='small'
                    sx={{ 
                      color: 'white', 
                      cursor: 'pointer', 
                      '&:hover': { color: (theme) => theme.palette.warning.light}
                    }} 
                    onClick = {toggleOpenNewColumnForm}
                  />
                </Box>
              </Box>
            }
      </Box>
    </SortableContext>
  )
}

export default ListColumns