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
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '~/utils/arrayMove'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

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

  const handleDragStart = (event) => {
    // console.log('handleDragStart::::', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragEnd =(event) => {
    // console.log('handleDragEnd::::', event)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    const {active, over} = event
    if(!over) return

    if(active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      const afterOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      setOrderedColumns(afterOrderedColumns)
    }
  }
  console.log('activeDragItemId::::', activeDragItemId)
  console.log('activeDragItemType::::', activeDragItemType)
  console.log('activeDragItemData::::', activeDragItemData)

  return (
    <DndContext 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd} 
      sensors={sensors}>
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