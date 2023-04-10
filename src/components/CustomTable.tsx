import React, { useState } from 'react'
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap'

interface TableProps<T> {
  data: T[]
  columns: { key: string; title: string }[]
  selectedUsers: T[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<T[]>>
  updateUser: (data: T) => void
}

export const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
  selectedUsers,
  setSelectedUsers,
  updateUser,
}: TableProps<T>) => {
  const handleRowSelect = (row: T) => {
    if (selectedUsers.includes(row)) {
      setSelectedUsers(selectedUsers.filter((r) => r !== row))
    } else {
      setSelectedUsers([...selectedUsers, row])
    }
  }
  const updateClicked = (data: T) => () => {
    // console.log('Update PopUp', column)
    updateUser(data)
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
              <td key={index} onClick={updateClicked(item)}>
                {item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
