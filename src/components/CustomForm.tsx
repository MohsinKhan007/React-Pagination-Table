import React, { useState, useEffect, SyntheticEvent } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { typemodifiedUser } from '../interfaces/Users'

export type formState = {
  email: string
  namefirst: string
  namelast: string
  userid: string
}
type CustomFormProps = {
  onClose: (title?: string) => void
  handleCreateOrUpdate: (data: formState) => void
  data?: typemodifiedUser
  title?: string
  children?: React.ReactNode
  isFormParent?: 'create' | 'update'
}

export const CustomForm = (props: CustomFormProps) => {
  const {
    title,
    children,
    isFormParent,
    onClose,
    data,
    handleCreateOrUpdate,
  } = props
  const [isFormState, setFormState] = useState({
    userid: '',
    email: '',
    namefirst: '',
    namelast: '',
    namelastError: '',
    namefirstError: '',
    emailError: '',
  })

  const saveUpdatedData = (data: typemodifiedUser) => {
    const firstLastName = data.name.split(' ')
    console.log('firstLastName', typeof firstLastName[0])
    const firstname: string = firstLastName[0]
    const lastname: string = firstLastName[1]
    console.log(data.userid)
    setFormState((prevState) => ({
      ...prevState,
      email: data.email,
      namefirst: firstname,
      namelast: lastname,
      userid: data.userid,
    }))
  }
  const validate = () => {
    let namefirstError = ''
    let emailError = ''
    let namelastError = ''

    if (!namefirst) {
      namefirstError = 'FirstName is required'
    }
    if (!namelast) {
      namelastError = 'LastName is required'
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email || reg.test(email) === false) {
      emailError = 'Email Field is Invalid '
    }

    if (emailError || namefirstError || namelastError) {
      setFormState((prevState) => {
        return { ...prevState, emailError, namefirstError, namelastError }
      })
      return false
    }

    return true
  }
  useEffect(() => {
    let isCancelled = false
    if (isFormParent === 'update' && !isCancelled) {
      if (data) {
        saveUpdatedData(data)
      }
    }
    return () => {
      isCancelled = true
      // if(isFormParent==='update'){
      setFormState({
        userid: '',
        email: '',
        namefirst: '',
        namelast: '',
        namelastError: '',
        namefirstError: '',
        emailError: '',
      })
      // }
    }
  }, [isFormParent])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('handle submit', isFormState.userid)
      const userid = isFormState.userid
      handleCreateOrUpdate({ email, namefirst, namelast, userid })
    }
  }
  const handleCancel = () => {
    console.log('handle cancel')
    onClose()
  }
  let {
    email,
    namefirst,
    namelast,
    emailError,
    namefirstError,
    namelastError,
  } = isFormState
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          value={namefirst}
          placeholder="Enter firstName"
          name="namefirst"
          onChange={handleFormChange}
        />
        <Form.Text className="text-danger font-weight-bold">
          {namefirstError}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLirstName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          value={namelast}
          placeholder="Enter firstName"
          name="namelast"
          onChange={handleFormChange}
        />
        <Form.Text className="text-danger font-weight-bold">
          {namelastError}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter email"
          name="email"
          onChange={handleFormChange}
        />
        <Form.Text className="text-danger font-weight-bold">
          {emailError}
        </Form.Text>
      </Form.Group>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleCancel} variant="danger" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isFormParent == 'update' ? `Update` : `Create`}
        </Button>
      </div>
    </Form>
  )
}
