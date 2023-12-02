import React, { useRef, useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './EmailForm.css'

export default function EmailSuggestion({page, setPage, formData, setFormData, handleEdit}) {
        const { currentUser } = useAuth();
        const [error, setError] = useState('');
        const [errorChanges, setErrorChanges] = useState('');
        const navigate = useNavigate();
        // Form Field Variables
        const desiredChange = useRef();
        async function handleSaveEmail(e) {
            setPage(3);
            currentUser.getIdToken().then((res) => {
                axios({
                  method: "POST",
                  url: "/gpt/save",
                  dataType: "json",
                  contentType: "application/json; charset=utf-8",
                  data: { id: currentUser.uid, email: formData},
                  headers: { authorization: res },
                })
                  .then((response) => {
                    const res = response.data;
                    let id = res["id"]
                    console.log(id);
                    navigate(`/view/${id}`)
                  })
                  .catch((error) => {
                    if (error.response) {
                      setError("Oops something went wrong with Jester");
                      console.log(error.response);
                      console.log(error.response.status);
                      console.log(error.response.headers);
                    }
                  });
              });
        }
        function checkFields() {
            let changesEmpty = desiredChange.current.value.length < 1 ? 'Changes Empty' : ''
            console.log(desiredChange.current.value)
            setErrorChanges(changesEmpty)
            return changesEmpty === 'Changes Empty'
          }

        async function handleRewrite(e) {
            let data = { id: currentUser.uid, formData: formData, desiredChange: desiredChange.current.value}
            let hasWarnings = checkFields()

            if(!hasWarnings) {
                setPage(3)
        
                currentUser.getIdToken().then((res) => {
                axios({
                    method: "POST",
                    url: "/gpt/rewrite",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: data,
                    headers: { authorization: res },
                })
                    .then((response) => {
                    const res = response.data;
                    setFormData({...res});
                    setPage(4);
                    console.log(page);
                    console.log(res);
                    })
                    .catch((error) => {
                    if (error.response) {
                        setError("Oops something went wrong with Jester");
                        console.log(error.response);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                    });
                });
            }
        }
  return (
    <>
        <Form>
        <Col md={{span: "7",offset: "1"}}>
            <Form.Group id="senderName">
            <Form.Label>Sender Name</Form.Label>
            <Form.Control
                type="text"
                defaultValue={formData.senderName}
                placeholder="ie John Doe"
                required
                disabled
            />
            </Form.Group>
            <Form.Group id="senderEmail">
            <Form.Label>Sender Email</Form.Label>
            <Form.Control
                type="email"
                defaultValue={formData.senderEmail}
                placeholder="JohnDoe@gmail.com"
                required
                disabled
            />
            </Form.Group>
            <Form.Group id="recipientName">
            <Form.Label>Recipient Name</Form.Label>
            <Form.Control
                type="text"
                defaultValue={formData.recipientName}
                placeholder="ie Jane Doe"
                required
                disabled
            />
            </Form.Group>
            <Form.Group id="recipientEmail">
            <Form.Label>Recipient Email</Form.Label>
            <Form.Control
                type="email"
                defaultValue={formData.recipientEmail}
                placeholder="JaneDoe@gmail.com"
                required
                disabled
            />
            </Form.Group>
            <Form.Group id="recipientRelationship">
            <Form.Label>Recipient Relationship</Form.Label>
            <Form.Control
                type="text"
                defaultValue={formData.recipientRelationship}
                placeholder="ie Mother"
                required
                disabled
            />
            </Form.Group>
            <Form.Group id="tone">
                <Form.Label>Tone</Form.Label>
                <Form.Control
                as="textarea"
                placeholder="ie. 'Friendly', 'Sad', etc."
                defaultValue={formData.tone}
                disabled
                />
            </Form.Group>
            <Form.Group id="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                as="textarea"
                placeholder="ie. Sorry for Crashing the car, we missed our quartlerly revenue goals, or requesting an extension to the project..."
                defaultValue={formData.content}
                disabled
                />
            </Form.Group>
            <Form.Group id="body">
                <Form.Label className=".suggestion">Jester Suggests</Form.Label>
                <Form.Control
                as="textarea"
                placeholder="ie. Sorry for Crashing the car, we missed our quartlerly revenue goals, or requesting an extension to the project..."
                defaultValue={formData.body}
                disabled
                />
            </Form.Group>
            <Form.Group id="Changes">
                {errorChanges && <Alert className="mt-2 mb-1" variant="danger">{errorChanges}</Alert>}
                <Form.Label> Type in any desired changes by typing below or save to your inbox</Form.Label>
                <Form.Control
                as="textarea"
                placeholder="ie. 'Can you make the email longer?', 'Can you make the tone sadder?' "
                ref={desiredChange}
                />
            </Form.Group>
            </Col>
        </Form>
        <Row>
            <Col xs={3}>
                    <Button
                    className="w-100 mt-4 mb-2"
                    type="button"
                    onClick={handleSaveEmail}
                    >
                    Save Email
                    </Button>
            </Col>
            <Col xs={{offset: 6, span: 3}}>
                    <Button
                    className="w-100 mt-4 mb-2"
                    type="button"
                    onClick={(handleRewrite)}
                    >
                    Rewrite Email
                    </Button>
            </Col>
        </Row>
    </>
  )
}
