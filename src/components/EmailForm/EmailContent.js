import React, { useRef, useState } from 'react'
import { Card, Button, Alert, Row, Col, Form } from "react-bootstrap"

export default function EmailContent({page, setPage, formData, setFormData}) {
  //Form Field Variables
  const content = useRef();
  //Form Control Variables
  const[ errorContent, setErrorContent ] = useState('');

  function checkFields() {
    let contentEmpty = content.current.value.length < 1 ? 'Content Empty' : ''

    setErrorContent(contentEmpty)

    return contentEmpty === 'Content Empty'
  }

  function setContentFormData() {
    setFormData({...formData, content: content.current.value})
  }

  async function handleContentInformation(e) {
    e.preventDefault()

    let hasWarnings = checkFields()

    if(!hasWarnings) {
      setContentFormData()
      setPage(page + 1)
    }
  }
  async function handlePrev(){
    setContentFormData()
    setPage(page - 1)
  }
  return (
    <>
    <h4>
        Great Basic Info is Recorded Let's move onto desired content
   </h4>
   <br></br>
    <h6>
        Add a few bullet points so Jester knows what to write about...
    </h6>
    <Form.Group id="content">
        {errorContent && <Alert className="mb-1" variant="danger">{errorContent}</Alert>}
        <Form.Label>Content</Form.Label>
        <Form.Control
        as="textarea"
        placeholder="ie. Sorry for Crashing the car, we missed our quartlerly revenue goals, or requesting an extension to the project..."
        defaultValue={formData.content}
        ref={content}
        />
    </Form.Group>
    <Row>
      <Col xs={3}>
                  <Button
                  className="w-100 mt-4 mb-2"
                  type="button"
                  onClick={handlePrev}
                  >
                  Previous
                  </Button>
        </Col>
        <Col xs={{offset: 6, span: 3}}>
                  <Button
                  className="w-100 mt-4 mb-2"
                  type="button"
                  onClick={(handleContentInformation)}
                  >
                  Continue
                  </Button>
        </Col>
    </Row>
    </>
  )
}
