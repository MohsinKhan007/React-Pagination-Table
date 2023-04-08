import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

type Props = {}

export const Footer = (props: Props) => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Text>Sitoo Test © 2023</Navbar.Text>
      </Container>
    </Navbar>
  )
}
