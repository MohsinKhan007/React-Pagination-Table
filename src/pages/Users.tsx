import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import useFetch from '../hooks/useFetch'
import { CustomTable } from '../components/CustomTable'
import CustomPagination from '../components/CustomPagination'
import {
  initialTypeModifiedUser,
  typemodifiedUser,
} from '../interfaces/Users'
import { Button, Container } from 'react-bootstrap'
import { usercolumns, recordPerPage } from '../consts/users'
import { CustomModal } from '../components/CustomModal'
import { CustomForm, formState } from '../components/CustomForm'
import { AlertMsg } from '../util/AlertMsg'
import { Loader } from '../util/Loader'
import { Api } from '../service/users.service'
import { httpResponses } from '../util/httpResponses'
import { AxiosErrorInterface } from '../interfaces/axios'
import { useSelected } from '../hooks/useSelected'
import { useCurrentPage } from '../hooks/useCurrentPage'

const Users = () => {
  const { currentPage, setCurrentPage } = useCurrentPage(1)

  const [reRender, setReRenderer] = useState(true)

  const { data, error, loading, dataCount } = useFetch(
    currentPage,
    recordPerPage,
    'fetchAllUsers',
    reRender
  )

  const { selectedRows, setSelectedRows } = useSelected<typemodifiedUser>()

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
    if (selectedRows.length) {
      Api.deleteSelectedUsers(selectedRows)
        .then((resp) => {
          setMsg({ sucessMsg: 'Users Deleted Sucessfully', errorMsg: '' })
        })
        .catch((err: AxiosErrorInterface) => {
          setMsg({
            sucessMsg: '',
            errorMsg: httpResponses(err.response.data.statuscode!)!,
          })
          throw new Error(err.stack)
        })
        .finally(() => {
          setSelectedRows([])
          setReRenderer((prevState) => !prevState)
        })
    } else {
      setMsg({
        sucessMsg: '',
        errorMsg: 'Please select at least one user to delete',
      })
    }
    toggleModal()
  }
  const createNewUser = () => {
    toggleModal('Add User')
  }

  const updateUser = (user: typemodifiedUser) => {
    toggleModal('Update User', user)
  }

  const toggleModal = (title?: string, user?: typemodifiedUser) => {
    setModalState((prevState) => ({
      ...prevState,
      title: !title ? '' : title,
      isOpen: !prevState.isOpen,
      updateData: user ? user : initialTypeModifiedUser,
    }))
  }

  const handlePaginate = (number: number) => {
    setCurrentPage(number)
    setMsg({
      sucessMsg: '',
      errorMsg: '',
    })
  }

  const handleCreateOrUpdate = ({
    email,
    namefirst,
    namelast,
    userid,
  }: formState) => {
    const data = {
      email,
      namefirst,
      namelast,
    }

    if (userid === '') {
      Api.createUser(data)
        .then((resp) => {
          setMsg({ sucessMsg: 'User Added Sucessfully', errorMsg: '' })
        })
        .catch((err: AxiosErrorInterface) => {
          setMsg({
            sucessMsg: '',
            errorMsg: httpResponses(err.response.data.statuscode!)!,
          })
          throw new Error(err.stack)
        })
        .finally(() => {
          setReRenderer((prevState) => !prevState)
          toggleModal()
        })
    } else {
      Api.updateUser(userid, data)
        .then((resp) => {
          setMsg({ sucessMsg: 'User Updated Sucessfully', errorMsg: '' })
        })
        .catch((err: AxiosErrorInterface) => {
          setMsg({
            sucessMsg: '',
            errorMsg: httpResponses(err.response.data.statuscode!)!,
          })
          throw new Error(err.stack)
        })
        .finally(() => {
          setReRenderer((prevState) => !prevState)
          toggleModal()
        })
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

  return (
    <Layout>
      <>
        {msg.sucessMsg && (
          <AlertMsg message={msg.sucessMsg} type="success" />
        )}
        {msg.errorMsg && <AlertMsg message={msg.errorMsg} type="danger" />}

        <CustomTable
          data={data}
          columns={usercolumns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          updateUser={updateUser}
        />

        <div className="footer-elements">
          <Button
            variant="danger"
            onClick={() => toggleModal('Delete Users')}
            className="footer-btn"
          >
            Delete Selected
          </Button>
          <div>
            <CustomPagination
              recordsPerPage={recordPerPage}
              totalRecords={dataCount}
              handlePaginate={handlePaginate}
              currentPage={currentPage}
            />
          </div>
          <Button
            variant="primary"
            className="footer-btn"
            onClick={createNewUser}
          >
            Add User
          </Button>
        </div>
      </>

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
          // is ko handle karna sahi
          <Container fluid>
            <p>Are you sure you want to delete the selected users?</p>
            <Button variant="danger" onClick={handleDeleteSelected}>
              Delete Selected
            </Button>
          </Container>
        )}
      </CustomModal>
    </Layout>
  )
}
export default Users
