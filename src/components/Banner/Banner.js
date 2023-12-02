import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Banner.css'

export default function Banner() {
  return (
    <Navbar expand="lg" variant="light" bg="light">
    <Container>
      <Link as="Navbar.Brand" to="/">JesterAI</Link>
    </Container>
    </Navbar>
  )
}
