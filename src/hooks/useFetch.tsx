import { useCallback, useEffect, useState } from 'react'
import { Api } from '../service/users.service'
import {
  initialTypeModifiedUserArray,
  typemodifiedUser,
} from '../interfaces/Users'
import { formateDate } from '../util/dateFormatter'
import { httpResponses } from '../util/httpResponses'

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
          .catch((err: any) => {
            const responseText = httpResponses(err.response.status)
            setError(responseText)
            throw new Error(responseText as string)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    },
    [requestType, currentPage, pageLimit, reRender]
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
  }, [requestType, pageLimit, currentPage, fetchAllUsers])

  return { data, loading, error, dataCount }
}

export default useFetch
