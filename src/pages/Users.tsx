import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import useFetch from '../hooks/useFetch'

import { CustomTable } from '../components/CustomTable'
import CustomPagination from '../components/CustomPagination'
import { typemodifiedUser } from '../interfaces/Users'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { CustomModal } from '../components/CustomModal'
import { CustomForm, formState } from '../components/CustomForm'

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  // tbd :Only check the
  const [recordPerPage, setRecordsPerPage] = useState<number>(6)
  const { data, error, loading, dataCount } = useFetch(
    currentPage,
    recordPerPage,
    'fetchAllUsers'
  )
  const [selectedUsers, setSelectedUsers] = useState<typemodifiedUser[]>([])
  const [isModalState, setModalState] = useState({
    isOpen: false,
    title: '',
  })

  const handleDeleteSelected = () => {
    console.log('handle Delete Selected')
    console.log(selectedUsers)
    toggleModal('Delete Users')
  }
  const createNewUser = () => {
    console.log('create new user')
    toggleModal('Add User')
  }
  const toggleModal = (title?: string) => {
    console.log('Toogle modal title', title)

    setModalState((prevState) => ({
      ...prevState,
      title: !title ? '' : title,
      isOpen: !prevState.isOpen,
    }))
  }
  const callUsers = () => {
    console.log('call users')
    const users = [{ id: '1' }, { id: '2' }, { id: '3' }]

    const deleteRequest = users.map(({ id }) =>
      axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    )
    Promise.all(deleteRequest).then((res) => {
      const responses: number[] = []
      res.forEach((element, index) => {
        responses.push(element.status)
      })
      console.log(responses, ' responses')
      if (
        responses.includes(200) &&
        responses.every((resp, _, res) => resp === res[0])
      ) {
        console.log('all users deleted')
      }
      console.log(res, ' promiseAll response')
    })
  }

  // const indexOfLastRecord = currentPage * recordPerPage
  // const indexOfFirstRecord = indexOfLastRecord - recordPerPage
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)

  const handlePaginate = (number: number) => {
    console.log('handle Paginate')
    setCurrentPage(number)
  }
  const handleCreateOrUpdate = (data: formState) => {
    console.log('handle Parent submit', data)
    // Call Api
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
        <CustomTable
          data={data}
          columns={columns}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <CustomPagination
          recordsPerPage={recordPerPage}
          totalRecords={dataCount}
          handlePaginate={handlePaginate}
          currentPage={currentPage}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="danger" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
          <Button variant="primary" onClick={createNewUser}>
            Add User
          </Button>
        </div>
      </>
      <button onClick={callUsers}>handle Delete Dummy request</button>
      {JSON.stringify(isModalState)}
      {/* <button onClick={() => toggleModal('')}>Toggle Modal</button> */}
      <CustomModal
        isOpen={isModalState.isOpen}
        title={isModalState.title}
        onClose={toggleModal}
      >
        {isModalState.title !== 'Delete Users' ? (
          isModalState.title === 'Add User' ? (
            <CustomForm
              isFormParent="create"
              handleCreateOrUpdate={handleCreateOrUpdate}
              onClose={toggleModal}
            />
          ) : (
            <CustomForm
              handleCreateOrUpdate={handleCreateOrUpdate}
              isFormParent="update"
              onClose={toggleModal}
              data={data[0]}
            />
          )
        ) : (
          <h1>Modal Content</h1>
        )}
      </CustomModal>
    </Layout>
  )
}
export default Users
