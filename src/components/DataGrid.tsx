import { IUser } from '../interfaces/Users'
import { useEffect } from 'react'
import { formateDate } from '../util/dateFormatter'

import React, { ReactNode } from 'react'
type Column<T> = {
  title: string
  dataIndex: keyof T
  render?: (value: any, record: T) => ReactNode
}

type Props<T> = {
  data: T[]
  columns: Column<T>[]
}

export function DataGrid<T>({ data, columns }: Props<T>) {
  return (
    <div>
      {!data ? (
        <div>No Data Found...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      )}
    </div>
  )
}
