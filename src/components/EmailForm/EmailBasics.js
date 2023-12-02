import React, { useRef, useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

export default function EmailBasics({page, setPage, formData, setFormData}) {
    // Form Field Variables
    const senderEmail = useRef();
    const senderName = useRef();
    const recipientEmail = useRef();
    const recipientName = useRef();
    const recipientRelationship = useRef();

    // Warning Variables
    const [errorSenderName, setErrorSenderName ] = useState('')
    const [errorSenderEmail, setErrorSenderEmail ] = useState('')
    const [errorRecipientName, setErrorRecipientName ] = useState('')
    const [errorRecipientEmail, setErrorRecipientEmail ] = useState('')
    const [errorRecipientRelationship, setErrorRecipientRelationship ] = useState('')

    function setBasicFormData() {
        setFormData({
            ...formData,
            senderName: senderName.current.value,
            senderEmail: senderEmail.current.value,
            recipientName: recipientName.current.value,
            recipientEmail: recipientEmail.current.value,
            recipientRelationship: recipientRelationship.current.value
        })
    }
    function checkFields() {
        let senderNameEmpty = senderName.current.value.length < 1 ? 'Sender Name Empty' : ''
        let senderEmailEmpty = senderEmail.current.value.length < 1 ? 'Sender Email Empty' : ''
        let recipientNameEmpty = recipientName.current.value.length < 1 ? 'Recipient Name Empty' : ''
        let recipientEmailEmpty = recipientEmail.current.value.length < 1 ? 'Recipient Email Empty' : ''
        let recipientRelationshipEmpty = recipientRelationship.current.value.length < 1 ? 'Recipient Relationship Empty' : ''

        setErrorSenderName(senderNameEmpty)
        setErrorSenderEmail(senderEmailEmpty)
        setErrorRecipientName(recipientNameEmpty)
        setErrorRecipientEmail(recipientEmailEmpty)
        setErrorRecipientRelationship(recipientRelationshipEmpty)
        
        let hasWarnings = senderEmailEmpty || senderNameEmpty || recipientNameEmpty || recipientEmailEmpty || recipientRelationshipEmpty;
        
        return hasWarnings
    }
    async function handleBasicInformation(e) {
        e.preventDefault()

        let hasWarnings = checkFields()

        if(!hasWarnings) {
            setBasicFormData()
            setPage(page + 1)
        }   
    }

    return (
        <>
        <h2 className="text-center mb-4">
            Start by adding some basic information
        </h2>
        <Form>
            <Col md={{span: "7",offset: "1"}}>

                <Form.Group id="senderName">
                {errorSenderName && <Alert className="mb-1" variant="danger">{errorSenderName}</Alert>}
                <Form.Label>Sender Name</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={formData.senderName}
                    placeholder="ie John Doe"
                    ref={senderName}
                    required
                />
                </Form.Group>
                <Form.Group id="senderEmail">
                {errorSenderEmail && <Alert className="mb-1" variant="danger">{errorSenderEmail}</Alert>}
                <Form.Label>Sender Email</Form.Label>
                <Form.Control
                    type="email"
                    defaultValue={formData.senderEmail}
                    placeholder="JohnDoe@gmail.com"
                    ref={senderEmail}
                    required
                />
                </Form.Group>
                <Form.Group id="recipientName">
                {errorRecipientName && <Alert className="mb-1" variant="danger">{errorRecipientName}</Alert>}
                <Form.Label>Recipient Name</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={formData.recipientName}
                    placeholder="ie Jane Doe"
                    ref={recipientName}
                    required
                />
                </Form.Group>
                <Form.Group id="recipientEmail">
                {errorRecipientEmail && <Alert className="mb-1" variant="danger">{errorRecipientEmail}</Alert>}
                <Form.Label>Recipient Email</Form.Label>
                <Form.Control
                    type="email"
                    defaultValue={formData.recipientEmail}
                    placeholder="JaneDoe@gmail.com"
                    ref={recipientEmail}
                    required
                />
                </Form.Group>
                <Form.Group id="recipientRelationship">
                {errorRecipientRelationship && <Alert variant="danger">{errorRecipientRelationship}</Alert>}
                <Form.Label>Recipient Relationship</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={formData.recipientRelationship}
                    placeholder="ie Mother"
                    ref={recipientRelationship}
                    required
                />
                </Form.Group>
            </Col>
            <Row>
            </Row>
            <Col xs={3}>
                <Button
                className="w-100 mt-4 mb-2"
                type="button"
                onClick={(handleBasicInformation)}
                >
                Continue
                </Button>
            </Col>
        </Form>
        </>
    );
}
