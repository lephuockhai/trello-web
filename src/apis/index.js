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