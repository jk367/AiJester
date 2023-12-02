import React, { useState } from "react"
import { Card, Nav, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ComposeButton from './ComposeButton';
import './Sidebar.css'
import { BsInbox, BsBook, BsGear  } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("")
    const navigate = useNavigate()
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
        <Row className='mt-3' style={{ minHeight: "100vh" }} >
            <Card>
                    <Card.Body className='mt-3 justify-content-start align-items-start' style={{ minHeight: "100" }}>
                        <ComposeButton></ComposeButton>

                        <Nav defaultActiveKey="/home" className="flex-column justify-content-start text-center mt-4">
                        <Nav.Link href="/inbox"><BsInbox/><span className='px-2'>Inbox</span></Nav.Link>
                        <Nav.Link href="/analyze"><BsBook/><span className='px-2'>Analyze</span></Nav.Link>
                        <Nav.Link href="/settings"><BsGear/><span className='px-2'>Settings</span></Nav.Link>
                        <Nav.Link onClick={handleLogout}> Logout </ Nav.Link>
                        </Nav>
                    </Card.Body>
            </Card>
        </Row>
      );
    }
