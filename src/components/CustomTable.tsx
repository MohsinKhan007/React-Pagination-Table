import React from 'react'
import { Table } from 'react-bootstrap'
// Add overlay and bootstrap work and manufactors bootstrap Alert  UI
interface TableProps<T> {
  data: T[]
  columns: { key: string; title: string }[]
  selectedRows: T[]
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>
  updateUser: (data: T) => void
}

export const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
  selectedRows,
  setSelectedRows,
  updateUser,
}: TableProps<T>) => {
  const handleRowSelect = (row: T) => {
    if (selectedRows.includes(row)) {
      setSelectedRows(selectedRows.filter((r) => r !== row))
    } else {
      setSelectedRows([...selectedRows, row])
    }
  }
  const updateClicked = (data: T) => () => {
    updateUser(data)
  }
  return (
    <div
      className="table-responsive-sm"
      style={{ height: '65vh', overflowY: 'auto' }}
    >
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
            <tr
              key={index}
              className="changebg"
              data-toggle="tooltip"
              data-placement="right"
              title="Click to Update"
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item)}
                  onChange={() => handleRowSelect(item)}
                />
              </td>
              {columns.map((column, index) => (
                <td
                  className="cursor-pointer"
                  key={index}
                  onClick={updateClicked(item)}
                >
                  {item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
