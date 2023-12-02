import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import EmailBasics from "./EmailBasics";
import EmailContent from "./EmailContent";
import EmailTone from "./EmailTone";
import EmailLoadingSpinner from './EmailLoadingSpinner';
import EmailSuggestion from "./EmailSuggestion";
import './EmailForm.css'

export default function EmailForm({formData, setFormData}) {
  // currentUser
  const { currentUser } = useAuth();
  // Form Control Variables
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');

  async function handleEdit() {
        setPage(page + 1)
        setFormData({...formData, user: currentUser.uid})

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
              setPage(page + 1)
              const res = response.data;
              setFormData({...res});
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
  async function handleSubmit() {
    console.log(page)
    setFormData({...formData, user: currentUser.uid})

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
    setPage(page +1)
  }

  const componentList = [
    <EmailBasics
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <EmailContent
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <EmailTone
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <EmailLoadingSpinner       
    formData={formData}
    setFormData={setFormData}
    page={page}
    setPage={setPage}
    />,
    <EmailSuggestion 
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
      handleEdit={handleEdit}
    />
  ];

  const headerList = [
    <h1> Let's Get Started </h1>,
    <h1> What should Jester write about?</h1>,
    <h1> How should Jester say it?</h1>,
  ]

  return (
    <Row className='mt-3' style={{ minHeight: "100vh" }} >
      <Card>
        <Card.Body>
          <Row className="mb-5 mt-3">
            <Col md={12} id="compose-header mb-4">
              {headerList[page]}
            </Col>
          </Row>
          <Col md={{span: "7",offset: "4"}}>
            <Card>
              <Card.Header>
                New Message
              </Card.Header>
              <Card.Body>
                {componentList[page]}
              </Card.Body>
            </Card>
          </Col>
        </Card.Body>
      </Card>
    </Row>
  );
}
