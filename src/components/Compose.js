import React, { useState } from "react";
import EmailForm from "./EmailForm/EmailForm";
import {  Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Sidebar from './Sidebar/Sidebar';

export default function Compose() {

    const [formData, setFormData] = useState({
      senderName: "",
      senderEmail: "",
      recipientName: "",
      recipientEmail: "",
      recipientRelationship: "",
      content: "",
      tone: "",
      subject: "",
      body: "", 
      bodyDrafts: [],
    });
    return (
        <>
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
        </>
    )
}
