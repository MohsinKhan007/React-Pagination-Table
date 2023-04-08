import React from 'react'
import { Navbar, Container, Image, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavbarLink = {
  Users: '/',
  Products: '/products',
  Manufacturers: '/manufacturers',
}

export const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image
              src={`sitoo-logo.png`}
              width="100"
              height="40"
              className="d-inline-block align-top"
              alt="Sitoologo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {Object.entries(NavbarLink).map(([key, value]) => {
                return (
                  <Nav.Link as={NavLink} to={value} key={key}>
                    {key}
                  </Nav.Link>
                )
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
