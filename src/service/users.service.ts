import { API } from '../util/API'

const getUsers = async () => {
  const data = await API.get('users.json')
  console.log(data)
}

export const Api = {
  getUsers,
}
