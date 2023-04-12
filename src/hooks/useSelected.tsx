import { useState } from 'react'

export function useSelected<T>() {
  const [selectedRows, setSelectedRows] = useState<T[]>([])

  return {
    selectedRows,
    setSelectedRows,
  }
}
