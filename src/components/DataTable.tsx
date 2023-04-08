import React, { FC } from 'react'
import { Table } from 'react-bootstrap'
interface TableProps<T> {
  data: T[]
  columns: { key: string; title: string }[]
}

export const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
}: TableProps<T>) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>{item[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default CustomTable
