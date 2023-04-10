import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import useFetch from '../hooks/useFetch'

import { CustomTable } from '../components/CustomTable'
import CustomPagination from '../components/CustomPagination'
import {
  IUser,
  initialTypeModifiedUser,
  typemodifiedUser,
} from '../interfaces/Users'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { CustomModal } from '../components/CustomModal'
import { CustomForm, formState } from '../components/CustomForm'
import { AlertMsg } from '../util/AlertMsg'
import { Loader } from '../util/Loader'
import { Api } from '../service/users.service'

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [reRender, setReRenderer] = useState(true)
  const [recordPerPage, setRecordsPerPage] = useState<number>(6)
  const { data, error, loading, dataCount } = useFetch(
    currentPage,
    recordPerPage,
    'fetchAllUsers',
    reRender
  )
  const [selectedUsers, setSelectedUsers] = useState<typemodifiedUser[]>([])
  const [isModalState, setModalState] = useState({
    isOpen: false,
    title: '',
    updateData: initialTypeModifiedUser,
  })

  const [msg, setMsg] = useState({
    sucessMsg: '',
    errorMsg: '',
  })

  const handleDeleteSelected = () => {
    console.log('handle Delete Selected')
    console.log(selectedUsers)
    Api.deleteSelectedUsers(selectedUsers)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setReRenderer((prevState) => !prevState)
        // toggleModal()
      })
    // toggleModal('Delete Users')
  }
  const createNewUser = () => {
    console.log('create new user')
    toggleModal('Add User')
  }

  const updateUser = (user: typemodifiedUser) => {
    console.log('update user', user)
    toggleModal('Update User', user)
  }

  const toggleModal = (title?: string, user?: typemodifiedUser) => {
    console.log('Toogle modal title', title)

    setModalState((prevState) => ({
      ...prevState,
      title: !title ? '' : title,
      isOpen: !prevState.isOpen,
      updateData: user ? user : initialTypeModifiedUser,
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
  const handleCreateOrUpdate = ({
    email,
    namefirst,
    namelast,
    userid,
  }: formState) => {
    // Add the current time and date in the interger format that is required by the API
    // in case of updated, only change the modified date and in case of create change both
    const data = {
      email,
      namefirst,
      namelast,
    }
    console.log(data)
    console.log(userid, ' userid')
    if (userid === '') {
      console.log('handle create')
      console.log(data)
      Api.createUser(data)
        .then((resp) => {
          console.log(resp, ' Response')
          setMsg({ sucessMsg: 'User Added Sucessfully', errorMsg: '' })
        })
        .catch((err) => {
          setMsg({ sucessMsg: '', errorMsg: err })
        })
        .finally(() => {
          setReRenderer((prevState) => !prevState)
          toggleModal()
        })
    } else {
      console.log('handle update')
      Api.updateUser(userid, data)
        .then((resp) => {
          console.log(resp, ' Response')
          setMsg({ sucessMsg: 'User Updated Sucessfully', errorMsg: '' })
        })
        .catch((err) => {
          setMsg({ sucessMsg: '', errorMsg: err })
        })
        .finally(() => {
          setReRenderer((prevState) => !prevState)
          toggleModal()
        })
      console.log(data)
    }
  }
  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  if (error)
    return (
      <Layout>
        <AlertMsg message={error} type="danger" />
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
          updateUser={updateUser}
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

      {JSON.stringify(isModalState)}
      {JSON.stringify(msg)}
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
              data={isModalState.updateData}
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
