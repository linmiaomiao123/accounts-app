import axios from 'axios';

const api = process.env.REACT_APP_RECORDS_API_URL || 'http://localhost:3004'

/** get方法获取records */
export const getAll = () =>
  axios.get(`${api}/records`)

/** post方法添加record数据 */
export const create = (body) =>
  axios.post(`${api}/records`, body)

/** put更新records数据 */
export const update = (id , body) =>
  axios.put(`${api}/records/${id}`, body)

/** delete删除 */
export const remove = (id) =>
  axios.delete(`${api}/records/${id}`)