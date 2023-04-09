import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
interface TableProps<T> {
  data: T[]
  columns: { key: string; title: string }[]
  selectedUsers: T[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<T[]>>
}

export const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
  selectedUsers,
  setSelectedUsers,
}: TableProps<T>) => {
  const handleRowSelect = (row: T) => {
    if (selectedUsers.includes(row)) {
      setSelectedUsers(selectedUsers.filter((r) => r !== row))
    } else {
      setSelectedUsers([...selectedUsers, row])
    }
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {columns.map((column, index) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                checked={selectedUsers.includes(item)}
                onChange={() => handleRowSelect(item)}
              />
            </td>
            {columns.map((column, index) => (
              <td key={index}>{item[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
