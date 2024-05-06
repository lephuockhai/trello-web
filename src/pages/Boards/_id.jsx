import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailApi } from '~/apis'
import { Divider } from '@mui/material'
import { createNewCardAPI, createNewColumnAPI } from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { updateBoardDetailApi } from '~/apis'

function Board() {
  const [ board, setBoard ] = useState(null)

  useEffect(() => {
    // tạm thơi fix cứng boardId, để phát triển lên thêm thì cần dùng react-router-dom để lấy chuẩn boardId từ url
    const boardId = '6636736c989b50e52fafd6bc'

    fetchBoardDetailApi(boardId).then(board => {

      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        }
      })

      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]

    //update page after add new colum or card
    //frontend phải làm stage data thay vì phải gọi api get data lại 
    //có thể BE sẽ hổ trợ cả phần này
    const newBoard = {...board}
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = {...board}
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)

    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)

  }


  //func này có nhiệm vụ gọi api và xử lý khi kéo thả column trong 1 board và chỉ cần cập nhật mảng columnOrderIds
  const moveColumns = (dndOrderedColumn) => {
    // cập nhật lại cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumn.map(c => c._id)
    const newBoard = {...board}
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //call api update column move
    updateBoardDetailApi(newBoard._id, {columnOrderIds: newBoard.columnOrderIds})
  }

  //func này có nhiệm vụ gọi api và xử lý khi kéo thả column trong 1 board và chỉ cần cập nhật mảng columnOrderIds
  const moveCardInTheSamecolumn = () => {

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
        createNewCard = {createNewCard}
        moveColumns = {moveColumns}
        moveCardInTheSamecolumn = {moveCardInTheSamecolumn}
      />
    </Container>
  )
}

export default Board