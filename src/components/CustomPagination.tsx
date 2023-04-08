import React from 'react'

type CustomPaginationrProps = {
  recordsPerPage: number
  totalRecords: number
  handlePaginate: (number: number) => void
  currentPage: number
}
const CustomPagination = ({
  recordsPerPage,
  totalRecords,
  handlePaginate,
  currentPage,
}: CustomPaginationrProps) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination" style={{ justifyContent: 'center' }}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item  ${
              number === currentPage ? 'active' : ''
            } `}
          >
            <p onClick={() => handlePaginate(number)} className="page-link">
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CustomPagination
