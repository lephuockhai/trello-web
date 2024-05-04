import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailApi } from '~/apis'
import { Divider } from '@mui/material'
import { createNewCardAPI, createNewColumnAPI } from '~/apis'

function Board() {
  const [ board, setBoard ] = useState(null)

  useEffect(() => {
    // tạm thơi fix cứng boardId, để phát triển lên thêm thì cần dùng react-router-dom để lấy chuẩn boardId từ url
    const boardId = '6636736c989b50e52fafd6bc'

    fetchBoardDetailApi(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
  }


  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh'}}>
      <AppBar />
      <Divider />
      <BoardBar board = {board} />
      <Divider />
      <BoardContent 
        board = {board} 
        createNewColumn = {createNewColumn}
        createNewCard = {createNewCard}/>
    </Container>
  )
}

export default Board