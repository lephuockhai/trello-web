import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '~/utils/arrayMove'


function BoardContent({ board }) {
  //https://docs.dndkit.com/api-documentation/sensors
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  
  // dùng sensor để xác định khi click chuột xác định vị trí di chuyển component hơn 10px thì mới detect vị trí tránh trường hợp người dùng click vào component nhưng không di chuyển mà vẫn detect vị trí
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //nhấn giữ 0,25 giây và phải di chuyển trên 5px thì event mới có thể bắt được hành động
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })


  // const sensors = useSensors(
  //   pointerSensor,
  //   mouseSensor,
  //   touchSensor)
  //ưu tiên sử dụng mouse và touch khi trải nghiệm trên mobile 
  const sensors = useSensors(
    mouseSensor,
    touchSensor)

  const [ orderedColumns, setOrderedColumns ] = useState([])
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event)
    const { active, over } = event

    //neu nhu keo tha column ra vi tri khong xac dinh duoc thi se return tranh bao loi
    if (!over) return

    if(active.id !== over.id) { // !== === so sanh type: strict not loose
      //lay vi tri cu
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id ) //this project use object then use findIndex in steap of indexOf
      const newIndex = orderedColumns.findIndex(c => c._id === over.id )
      /**
       * dùng arrayMove của sortable để cập nhật lại vị trí của các column thông qua 3 thông số
       * arrayMove(array, from, to)
       * array là mảng chứa vị trí các column ban đầu
       * from là vị trí cũ trước khi di chuyển
       * to là vị trí mới kéo thả đến
       */
      const afterOrderedColums = arrayMove(orderedColumns, newIndex, oldIndex)
      // const afterOrderedColumsIds = (afterOrderedColums.map(c => c._id))
      // console.log('afterOrderedColums', afterOrderedColums)
      // console.log('afterOrderedColumsIds', afterOrderedColumsIds)
      setOrderedColumns(afterOrderedColums) // update status of column after change
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => (theme.trello.boardContentHeight),
        p: '10px 0'
        }}> 
        <ListColumns mns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent