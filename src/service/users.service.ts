import { IUsers } from '../interfaces/Users'
import { API } from '../util/API'

const getAllUsers = async () => {
  return API.get<IUsers>('/users.json')
}

export const Api = {
  getAllUsers,
}
