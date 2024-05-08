//call api from trello api

import axios from 'axios'
import { API_ROOT } from '~/utils/constants'


/**
 * ở function bên dưới sẽ request và lấy data từ response chứ không phải dùng try catch hay là then catch vì làm vậy sẽ không tối ưu
 * clean code
 * giải pháp cho việc clean code 1 cách gọn gàng là catch lỗi tập trung tại 1 nơi bằng cách sử dụng function mạnh mẽ trong axios đó là interceptor 
 * interceptor là cách mà ta đánh chặn vào giữa request và response để xử lý logic mà chúng ta muốn
 */
export const fetchBoardDetailApi = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

    //axios sẽ trả về các property của nó là data
    return response.data
}

export const updateBoardDetailApi = async (boardId, newColumnOrderIds) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, newColumnOrderIds)
    return response.data
}

export const createNewColumnAPI = async (newColumnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
}

export const updateColumnDetailApi = async (columnId, newCardOrderIds) => {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, newCardOrderIds)
    return response.data
}

export const deleteColumnAPI = async (columnId) => {
    const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
    return response.data
}

export const moveCardToDifferencecolumnAPI = async (updateCard) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving-card`, updateCard)
    return response.data
}

export const createNewCardAPI = async (newCardData) => {
    const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
}


