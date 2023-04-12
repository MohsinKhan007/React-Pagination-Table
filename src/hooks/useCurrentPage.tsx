import { useState } from 'react'

export const useCurrentPage = (initialValue: number) => {
  const [currentPage, setCurrentPage] = useState<number>(initialValue)
  return { currentPage, setCurrentPage }
}
