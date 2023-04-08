import { UserFetchData } from '../interfaces/Users'
import { API } from '../util/API'

const getAllUsers = async (currentPage?: number, pageLimit?: number) => {
  const fetchPage = currentPage ? currentPage : 1
  const fetchLimit = pageLimit ? pageLimit : 10
  return API.get<UserFetchData>(
    `/users.json?start=${fetchPage}&num=${fetchLimit}`
  )
}

export const Api = {
  getAllUsers,
}
