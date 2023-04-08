import { useEffect, useState } from 'react'
import { Api } from '../service/users.service'
import {
  initialTypeModifiedUser,
  typemodifiedUser,
} from '../interfaces/Users'
import { formateDate } from '../util/dateFormatter'

const useFetch = (
  currentPage?: number,
  pageLimit?: number,
  requestType?: string
) => {
  const [data, setData] = useState<typemodifiedUser[]>(
    initialTypeModifiedUser
  )
  const [dataCount, setDataCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  const fetchAllUsers = (apiCancelled: boolean) => {
    if (requestType && !apiCancelled) {
      Api.getAllUsers(currentPage, pageLimit)
        .then((resp) => {
          const modifiedData: typemodifiedUser[] = resp.data.items.map(
            (item) => ({
              email: item.email,
              userid: item.userid,
              datecreated: formateDate(item.datecreated),
              datemodified: formateDate(item.datemodified),
              name: `${item.namefirst} ${item.namelast}`,
            })
          )

          setData(modifiedData)
          setDataCount(resp.data.totalcount)
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
    let apiCancelled = false
    if (requestType === 'fetchAllUsers') fetchAllUsers(apiCancelled)

    return () => {
      apiCancelled = true
      setData(initialTypeModifiedUser)
      setLoading(true)
      setError('')
    }
  }, [requestType, pageLimit, currentPage])

  return { data, loading, error, dataCount }
}

export default useFetch
