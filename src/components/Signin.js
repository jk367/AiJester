import {React, useRef, useState} from 'react'
import {Form, Button, Card, Alert, Row, Col} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import jester from '../images/JesterLogo.png'

export default function Signin() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, signInGoogle } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleGoogleSignIn(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signInGoogle()
            navigate('/')
        } catch {
            setError('Failed to sign in with Google')
        }
        setLoading(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }
  return (
    <>
    <Row className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <Row className="d-flex align-items-center justify-content-center">
                        <Card.Img className='mx-auto' variant="top" src={jester} alt={"jester"} style={{"maxWidth": "100px"}}/>
                    </Row>
                    <h2 className='text-center mb-4'>JesterAI</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-4 mb-2' type="submit">
                            Sign In
                        </Button>
                    </Form>
                    <div className="w-100 d-flex justify-content-between mt-3 mb-2">
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <Link to="/signup">Sign up</Link>
                    </div>
                    <div className="w-100 text-center mt-1">
                        <p>Or you can sign in with</p>
                        <svg as="button" onClick={handleGoogleSignIn} disabled={loading} type="button" viewBox="0 0 24 24" width="2em" height="2em" className="icon__1Md2 icon__3F7K"><path fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm.044-5.213c2.445 0 4.267-1.551 4.556-3.781v-1.891h-4.519v1.89h2.602a2.893 2.893 0 0 1-2.724 1.93c-1.194 0-2.677-1.1-2.677-2.843 0-1.621 1.161-2.876 2.677-2.876.739 0 1.413.279 1.922.736l1.399-1.376a4.744 4.744 0 1 0-3.236 8.212z"></path></svg>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </Row>
    </>
  )
}
