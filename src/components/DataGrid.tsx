import { IUsers } from '../interfaces/Users'
import { useEffect } from 'react'
import { formateDate } from '../util/dateFormatter'

export const DataGrid = (data: IUsers) => {
  useEffect(() => {
    console.log(`DataGrid: ${data.items.length}`)
  })
  return (
    <div>
      {!data ? (
        <div>No Data Found...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date Created</th>
              <th>Date Modified</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((data, index) => (
              <tr key={index}>
                <td>{data.userid}</td>
                <td>
                  {data.namefirst} {data.namelast}
                </td>
                <td>{data.email}</td>
                <td>{formateDate(data.datecreated)}</td>
                <td>{formateDate(data.datemodified)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
