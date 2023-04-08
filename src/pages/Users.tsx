import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import useFetch from '../hooks/useFetch'

import { CustomTable } from '../components/CustomTable'
import CustomPagination from '../components/CustomPagination'

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  // will use while adding scrolling
  const [recordPerPage, setRecordsPerPage] = useState<number>(6)

  const { data, error, loading, dataCount } = useFetch(
    currentPage,
    recordPerPage,
    'fetchAllUsers'
  )

  // const indexOfLastRecord = currentPage * recordPerPage
  // const indexOfFirstRecord = indexOfLastRecord - recordPerPage
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)

  const handlePaginate = (number: number) => {
    console.log('handle Paginate')
    setCurrentPage(number)
  }

  if (loading)
    return (
      <Layout>
        <h2>loading</h2>
      </Layout>
    )
  if (error)
    return (
      <Layout>
        <h2>{error}</h2>
      </Layout>
    )

  const columns = [
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Date Created', key: 'datecreated' },
    { title: 'Date Modified', key: 'datemodified' },
  ]

  return (
    <Layout>
      <>
        <CustomTable data={data} columns={columns} />
        <CustomPagination
          recordsPerPage={recordPerPage}
          totalRecords={dataCount}
          handlePaginate={handlePaginate}
          currentPage={currentPage}
        />
      </>
    </Layout>
  )
}
export default Users
