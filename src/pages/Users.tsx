import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import useFetch from '../hooks/useFetch'
import { DataGrid } from '../components/DataGrid'

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const limit = 10
  const { data, error, loading } = useFetch(
    currentPage,
    limit,
    'fetchAllUsers'
  )
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

  return (
    <Layout>
      <p>
        {/* {JSON.stringify(data.items)} */}
        <DataGrid {...data} />
      </p>
    </Layout>
  )
}
export default Users
