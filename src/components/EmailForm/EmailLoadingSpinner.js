import React from 'react'
import { Spinner, Row, Col, } from 'react-bootstrap'

export default function EmailLoadingSpinner({page, setPage, formData, setFormData}) {
  return (
    <>
    <Row className='d-flex align-items-center mb-5'>
        <h1 className='mb-5 mt-3 text-center'>Jester is Writing that email for you </h1>
        <br></br>
        <h1 className='mb-5 mt-5 text-center'>Thank you for your patience...</h1>
        <br></br>
    </Row>
    <Row className='d-flex align-items-center justify-content-center mb-5'>
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
    </Row>
    </>
  )
}
