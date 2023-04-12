import React from 'react'

type CustomPaginationProps = {
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
}: CustomPaginationProps) => {
  const pageNumbers = []
  const totalPagesCount = Math.ceil(totalRecords / recordsPerPage)
  for (let i = 1; i <= totalPagesCount; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination justifyCctr">
        <li key={1} className={`page-item`}>
          <p
            onClick={() => handlePaginate(1)}
            className="page-link cursor-pointer"
          >
            {'<<'}
          </p>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item  ${
              number === currentPage ? 'active' : ''
            } `}
          >
            <p
              onClick={() => handlePaginate(number)}
              className="page-link cursor-pointer"
            >
              {number}
            </p>
          </li>
        ))}
        <p
          onClick={() => handlePaginate(totalPagesCount)}
          className="page-link cursor-pointer"
        >
          {'>>'}
        </p>
      </ul>
    </nav>
  )
}

export default CustomPagination
