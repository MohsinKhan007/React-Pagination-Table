import { useEffect, useState } from 'react'
import { Api } from '../service/users.service'
import { IUsers, initialUsers } from '../interfaces/Users'

// interface State<T> {
//   data?: T
//   error: Error
// }

const useFetch = (
  currentPage?: number,
  pageLimit?: number,
  requestType?: string
) => {
  const [data, setData] = useState<IUsers>(initialUsers)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  let apiCancelled = false

  const fetchAllUsers = () => {
    if (requestType && !apiCancelled) {
      Api.getAllUsers(currentPage, pageLimit)
        .then((resp) => {
          console.log(`users ${JSON.stringify(resp.data.items.length)}`)
          setData(resp.data)
        })
        .catch((err: any) => {
          setError(err.message)
          throw new Error(err as string)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    if (requestType == 'fetchAllUsers') fetchAllUsers()

    return () => {
      apiCancelled = true
      setData(initialUsers)
      setLoading(true)
      setError('')
    }
  }, [requestType])

  return { data, loading, error }
}

export default useFetch
