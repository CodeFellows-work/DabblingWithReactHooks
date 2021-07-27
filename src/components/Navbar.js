import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


function NavigatingBar() {

    return (
        <>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">NavBar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        </>

    )
}

export default NavigatingBar; 