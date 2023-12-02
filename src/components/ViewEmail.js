import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert, Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";
import Sidebar from './Sidebar/Sidebar';

export default function ViewEmail() {
    const { id } = useParams();
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    console.log(id);


    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          navigate('/login')
        } catch {
          setError("Failed to log out")
        }
      }
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
                <Row className="mt-3">
                  <Card>
                    <Card.Body>
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
              <Col md={1}></Col>
              </Row>
    </>
  )
}
