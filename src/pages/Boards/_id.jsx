import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { generatePlaceHolderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { 
  updateBoardDetailApi, 
  updateColumnDetailApi, 
  fetchBoardDetailApi,
  createNewCardAPI, 
  createNewColumnAPI,
  moveCardToDifferencecolumnAPI
} from '~/apis'
import { mapOrder } from '~/utils/sorts'
import CircularProgress from '@mui/material/CircularProgress'

function Board() {
  const [ board, setBoard ] = useState(null)

  useEffect(() => {
    // tạm thơi fix cứng boardId, để phát triển lên thêm thì cần dùng react-router-dom để lấy chuẩn boardId từ url
    const boardId = '6636736c989b50e52fafd6bc'

    fetchBoardDetailApi(boardId).then(board => {

      //sắp xếp thứ tự column trước khi đưa xuống các tầng con
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          //khi f5 trang web thì cần xử lý vấn đề kéo thả vào một column rỗng
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        }
        else {
          //sắp xếp thứ tự card ở đây trước khi đưa dữ liệu xuống bên dưới các component con 
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
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

    if (columnToUpdate.cards.some(card => card.FE_PlaceHolderCard)) {
      columnToUpdate.cards = [createdCard]
      columnToUpdate.cardOrderIds = [createdCard._id]
    } else {
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
  const moveCardInTheSamecolumn = (afterOrderedCards, dndOrderedCardIds, columnId) => {
    //update data card
    const newBoard = {...board}
    const newColumnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (newColumnToUpdate) {
      newColumnToUpdate.cards = afterOrderedCards
      newColumnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    //call api update column
    updateColumnDetailApi(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * khi di chuyển card sang column khác
   * 1. xoá cardid ở  cardOrderIds của column cũ khi kéo qua 1 column khác
   * 2. cập nhật mảng cardOrderIds của column mới
   * 3. cập nhật lại trường columnId mới của của card đã kéo
   * => làm 1 API suport riêng
   */
  const moveCardToDifferencecolumn = (currentCardId, preColumnId, nextColumnId, dndOrderedColumn) => {

    //update dữ liệu
    const dndOrderedColumnsIds = dndOrderedColumn.map(column => column._id)
    const newboard = {...board}
    newboard.columns = dndOrderedColumn
    newboard.columnOrderIds = dndOrderedColumnsIds

    setBoard(newboard)

    //danh sách cardOrderIds
    let preCardOrderIds = dndOrderedColumn.find(c => c._id === preColumnId)?.cardOrderIds

    //xử lý khi kéo card cuối cùng ra khỏi column tránh trả về giá trị holdercard
    if (preCardOrderIds[0].includes('-placeholder-card')) preCardOrderIds = []

    // call api
    moveCardToDifferencecolumnAPI({
      currentCardId,
      preColumnId,
      preCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumn.find(c => c._id === nextColumnId)?.cardOrderIds,
    })

  }

  if (!board) {
    return (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
        }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
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
        moveCardToDifferencecolumn = {moveCardToDifferencecolumn}
      />
    </Container>
  )
}

export default Board