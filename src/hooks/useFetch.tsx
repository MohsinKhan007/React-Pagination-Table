import { useCallback, useEffect, useState } from 'react'
import { Api } from '../service/users.service'
import {
  initialTypeModifiedUserArray,
  typemodifiedUser,
} from '../interfaces/Users'
import { formateDate } from '../util/dateFormatter'
import { httpResponses } from '../util/httpResponses'
import { AxiosErrorInterface } from '../interfaces/axios'

const useFetch = (
  currentPage?: number,
  pageLimit?: number,
  requestType?: string,
  reRender?: boolean
) => {
  const [data, setData] = useState<typemodifiedUser[]>(
    initialTypeModifiedUserArray
  )
  const [dataCount, setDataCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  const fetchAllUsers = useCallback(
    (apiCancelled: boolean) => {
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
          .catch((err: AxiosErrorInterface) => {
            setError(httpResponses(err.response.data.statuscode!)!)
            throw new Error(err.stack)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    },
    [requestType, currentPage, reRender]
  )

  useEffect(() => {
    let apiCancelled = false
    if (requestType === 'fetchAllUsers') fetchAllUsers(apiCancelled)

    return () => {
      apiCancelled = true
      setData(initialTypeModifiedUserArray)
      setLoading(true)
      setError('')
    }
  }, [requestType, currentPage, fetchAllUsers])

  return { data, loading, error, dataCount }
}

export default useFetch
