import React from 'react'
import { Layout } from '../components/Layout'
import useFetch from '../hooks/useFetch'

const Users = () => {
  const { data, error, loading } = useFetch('fetchAllUsers')
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
      <p style={{ overflow: 'hidden', height: '60vh' }}>
        Users : {JSON.stringify(data)}
      </p>
    </Layout>
  )
}
export default Users
