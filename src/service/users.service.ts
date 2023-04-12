import { UserFetchData, typemodifiedUser } from '../interfaces/Users'
import { API } from '../util/API'

const getAllUsers = async (currentPage?: number, pageLimit?: number) => {
  const fetchPage = currentPage ? currentPage : 1
  const fetchLimit = pageLimit ? pageLimit : 10
  return API.get<UserFetchData>(
    `/users.json?start=${fetchPage}&num=${fetchLimit}`
  )
}

const deleteSelectedUsers = async (users: typemodifiedUser[]) => {
  const deleteAllUsers = users.map(({ userid }) =>
    API.delete(`/users/${userid}.json`)
  )
  return Promise.all(deleteAllUsers).then((res) => {
    const responses: number[] = []
    res.forEach((element, index) => {
      responses.push(element.status)
    })

    if (
      responses.includes(200) &&
      responses.every((resp, _, res) => resp === res[0])
    ) {
      return res[0]
    }
  })
}

const createUser = async (users: {
  namelast: string
  namefirst: string
  email: string
}) => {
  return API.post('/users.json', users)
}

const updateUser = async (
  userid: string,
  data: {
    namelast: string
    namefirst: string
    email: string
  }
) => {
  const { namelast, namefirst, email } = data
  return API.put(`/users/${userid}.json`, {
    namelast,
    namefirst,
    email,
  })
}

export const Api = {
  getAllUsers,
  createUser,
  deleteSelectedUsers,
  updateUser,
}
