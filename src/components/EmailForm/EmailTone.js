import React, { useRef, useState } from 'react'
import { Button, Alert, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function EmailTone({page, setPage, formData, setFormData}) {
    // currentUser
    const { currentUser } = useAuth();
    //Form Field Variables
    const tone = useRef();

    //Form Control Variables
    const[ errorTone, setErrorTone ] = useState('');
    const [error, setError] = useState('');
    
    function checkFields() {
      let toneEmpty = tone.current.value.length < 1 ? 'tone Empty' : ''
      console.log(tone.current.value)
      setErrorTone(toneEmpty)
      return toneEmpty === 'Tone Empty'
    }
  
    async function setToneFormData() {
      setFormData({...formData, tone: tone.current.value})
    }

    async function handlePrev(){
      setToneFormData()
      setPage(page - 1)
    }

    async function handleWriteEmail(e) {
      e.preventDefault();
  
      let hasWarnings = checkFields()

      if(!hasWarnings) {

        await setToneFormData().then(
          currentUser.getIdToken().then((res) => {
            axios({
              method: "POST",
              url: "/gpt/write",
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: { id: currentUser.uid, formData: formData },
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
          })
        )

        setPage(page + 1)

      }
    }
  return (
    <>
    <h4>
        Lastly, let's add the feelings you want to convey
   </h4>
   <br></br>
    <h6>
        Give Jester a desired tone to the email you want to write
    </h6>
    <Form.Group id="tone">
        {errorTone && <Alert className="mb-1" variant="danger">{errorTone}</Alert>}
        <Form.Label>Tone</Form.Label>
        <Form.Control
        as="textarea"
        placeholder="ie. 'Friendly', 'Sad', etc."
        defaultValue={formData.tone}
        ref={tone}
        />
    </Form.Group>
    <br></br>
    <h6>
        That's Everything Jester needs to generate this email!
    </h6>
    <br></br>
    <h6>
        Please review all of the fields, and then let Jester do the hardwork and write that message!
    </h6>
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
                  onClick={(handleWriteEmail)}
                  >
                  Write Email
                  </Button>
        </Col>
    </Row>
    </>
  )
}
