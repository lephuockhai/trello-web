import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '~/utils/arrayMove'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

// khi keo 1 column hoac card thi phần giữ chỗ mờ sẽ không bị mất đi
const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({ styles: {active: {opacity: '0.5' }}})
}

function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

  const sensors = useSensors(
    mouseSensor,
    touchSensor)

  const [ orderedColumns, setOrderedColumns ] = useState([])

  //on the same time only a element being dragged
  const [ activeDragItemId, setActiveDragItemId ] = useState(null)
  const [ activeDragItemType, setActiveDragItemType ] = useState(null)
  const [ activeDragItemData, setActiveDragItemData ] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDrago&er chúng ta sẽ
    // làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo
    // ra cardOrderIds mới.
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart::::', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trigger trong qua trinh keo 1 element
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các columns
    const { active, over } = event

      // - Cần - đảm bảo nêu không tồn tại active hoặc over• (khi kéo ra khỏi phạm vi container) thì không làm gì( tránh• crash trang)
    if (!active || !over) return
    
    // activeDraggingCard: Là cái card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    // overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên.
    const { id: overCardId } = over

    // tìm 2 cái column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    //nếu như kéo thả card vào các column khác thì mới xử lý
    // xử lý trong handleover chỉ là xử lý khi kéo giữ 1 card còn sau khi thả thì sẽ xử lý ở handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(precolumns => {
        // tìm vị trí của activeCard sắp được thả 
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // logic tính toán  "cardIndex mới" trên hoặc dưới của overCard
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // clone mảng orderedcolumnstate cũ để xử lý data rồi return về ordercolumnstate mới 
        const nextColumn = cloneDeep(precolumns)
        const nextActiveColumn = nextColumn.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumn.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          //xoá card vừa kéo ở column cũ chứa nó
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //cap nhật bằng mảng cardOrderIds để khớp với mock data
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          //Kiếm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //thêm card đang kéo vào overcolumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDragItemData)

          //cap nhật bằng mảng cardOrderIds để khớp với mock data
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        console.log('nextColumn:::', nextColumn)
        return nextColumn
      })
    }
  }

  const handleDragEnd =(event) => {
    // console.log('handleDragEnd::::', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('nothing')
      return
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)

    const {active, over} = event
    
    // - Cần - đảm bảo nêu không tồn tại active hoặc over• (khi kéo ra khỏi phạm vi container) thì không làm gì( tránh• crash trang)
    if (!active || !over) return

    if(active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      const afterOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      setOrderedColumns(afterOrderedColumns)
    }
    
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={ closestCorners }
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => (theme.trello.boardContentHeight),
        p: '10px 0'
        }}> 
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {/* khi keo 1 element thi dong nghia voi viec handleDragStart dang hoat dong va no se xem thu neu nhu ban dang keo column 
          thi no se keep place column va cac phan tu cho ban va tuong tu doi voi card*/}
          { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) ? <Column column={activeDragItemData} /> : null }
          { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) ?<Card card={activeDragItemData} /> : null }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent