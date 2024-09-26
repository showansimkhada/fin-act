'use client'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import { signOut } from 'next-auth/react'
import { dataSlice, lsUser } from '@/lib/redux'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Container, Navbar, Nav} from 'react-bootstrap'

export default function Navbars() {
  const [isClient, setIsClient] = useState(false)
  const dispatch = useDispatch()
  const username = String(useSelector(lsUser)).toUpperCase()
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  function handleSignOut() {
    dispatch(dataSlice.actions.clearLS())
    signOut()
  }
  
  if (isClient) {
    return (
      <>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>WELCOME {`${username}`}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dash">Home</Nav.Link>
              <Nav.Link href="/bs">Balance Data</Nav.Link>
              <Nav.Link href='/profile'>Profile</Nav.Link>
              <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    )
  } else {
    return (
      <></>
    )
  }
}