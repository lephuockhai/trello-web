import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailApi } from '~/apis'
import { Divider } from '@mui/material'

function Board() {
  const [ board, setBoard ] = useState(null)

  useEffect(() => {
    // tạm thơi fix cứng boardId, để phát triển lên thêm thì cần dùng react-router-dom để lấy chuẩn boardId từ url
    const boardId = '6632fcd1864440d6230365c4'

    fetchBoardDetailApi(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh'}}>
      <AppBar />
      <Divider />
      <BoardBar board = {board} />
      <Divider />
      <BoardContent board = {board} />
    </Container>
  )
}

export default Board