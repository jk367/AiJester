import React from 'react'
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

export default function Email() {
  return (
    <Row className="d-flex justify-content-center"
        style={{ minHeight: "100vh" }}>
    <Col md={1}></Col>
    <Col md={2}>
        <Sidebar/>
    </Col>
    <Col md={1}></Col>
    <Col md={7}>
        <EmailForm 
        formData={formData}
        setFormData={setFormData}
        />
    </Col>
    <Col md={1}></Col>
    </Row>
  )
}
