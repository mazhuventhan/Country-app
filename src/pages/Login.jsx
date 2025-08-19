import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice.js'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { FaGoogle, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    return regex.test(pwd)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validatePassword(password)) {
      setError('Password must be at least 8 chars, 1 uppercase, 1 number, 1 symbol.')
      return
    }
    dispatch(login({ email }))
    navigate('/home')
  }

  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <div className='p-lg-5 p-3' style={{ maxWidth: '400px', width: '100%' }}>
            <h3 className="mb-3 fw-bold">Sign In</h3>
            <p>
              New user? <a href="#" style={{ textDecoration: "none" }}>Create an account</a>
            </p>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Username or email"
                  className='bg-none rounded-0'
                  style={{ border: '#000 2px solid' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className='bg-none rounded-0'
                  style={{ border: '#000 2px solid' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Check
                type="checkbox"
                label="Keep me signed in"
                className="mb-3 rounded-0"
              />
              <Button type="submit" variant="dark" className="w-100 rounded-0">
                Sign In
              </Button>
            </Form>

            <hr />
            <p className="text-center">Or Sign In With</p>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="outline-dark" className="rounded-circle">
                <FaGoogle />
              </Button>
              <Button variant="outline-dark" className="rounded-circle">
                <FaFacebook />
              </Button>
              <Button variant="outline-dark" className="rounded-circle">
                <FaLinkedin />
              </Button>
              <Button variant="outline-dark" className="rounded-circle">
                <FaTwitter />
              </Button>
            </div>
          </div>
        </Col>
        <Col
          md={1}
          className="d-none d-md-flex justify-content-center align-items-center"
        ></Col>
        <Col
          md={5}
          className="d-none d-md-flex justify-content-center align-items-center"
        >
          <img
            src="/Img.png"
            alt="Login Illustration"
            style={{ height: '100%' }}
          />
        </Col>
      </Row>
    </Container>
  )
}
