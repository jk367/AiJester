import React, { useEffect } from "react"
import { Card, Button, Alert, Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";
import Sidebar from './Sidebar/Sidebar';

export default function Inbox() {
  const { currentUser } = useAuth()


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
