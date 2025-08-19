import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../redux/countriesSlice.js'
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Home() {
  const dispatch = useDispatch()
  const { countries } = useSelector((state) => state.countries)
  const [visible, setVisible] = useState(10)
  const [region, setRegion] = useState('All')

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  const filtered = region === 'All' ? countries : countries.filter(c => c.region === region)

  return (
    <>
      <Navbar expand="md" bg="light" sticky="top" className=" border-bottom">
        <Container>
          <Navbar.Brand className="fw-bold">Countries</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto custom-nav"
              activeKey={region}
              onSelect={(selectedKey) => setRegion(selectedKey)}
            >
              <Nav.Link eventKey="All">All</Nav.Link>
              <Nav.Link eventKey="Asia">Asia</Nav.Link>
              <Nav.Link eventKey="Europe">Europe</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col>
            <div className='mt-lg-2' style={{ borderTop: '2px solid #000' }} />
          </Col>
          <Col lg={2}>
            <h1 className="text-center mt-2 mb-lg-4">WELCOME</h1>
          </Col>
          <Col>
            <div className='mt-lg-5 mb-lg-0 mb-3 ms-lg-4' style={{ borderBottom: '2px solid #000' }} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col lg={9} md={8} sm={12} className="mb-3 order-2 order-md-1">
            <Carousel className="border rounded shadow-sm">
              <Carousel.Item>
                <img className="d-block w-100 h-100" src="/slides/slide1.svg" alt="Slide 1" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 h-100" src="/slides/slide2.svg" alt="Slide 2" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 h-100" src="/slides/slide3.svg" alt="Slide 3" />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col lg={3} md={4} sm={12} className="order-1 order-md-2">
            <img style={{ height: "280px" }} className="d-block w-100 border rounded shadow-sm" src="/slides/slide2.svg" alt="Side Banner" />
          </Col>
        </Row>

        <Row>
          {filtered.slice(0, visible).map((c) => (
            <Col key={c.name} lg={6} md={4} sm={6} xs={12} className="mb-4">
              <div className="d-flex align-items-center border rounded shadow-sm p-3 h-100 text-start bg-white">
                <img
                  src={c.flag}
                  alt={c.name}
                  style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                />
                <div className='ms-3'>
                  <h6 className="mt-2">{c.name}</h6>
                  <small className="text-muted">{c.region}</small>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {visible < filtered.length && (
          <div className="text-center mt-3 mb-5">
            <Button className='rounded-0' onClick={() => setVisible(v => v + 10)} variant="dark">Load More</Button>
          </div>
        )}
      </Container>

      <footer className="text-center py-4 mt-3">
        <div className="mb-3">
          <Button variant="outline-dark" size="sm" className="rounded-circle mx-1"><FaFacebook /></Button>
          <Button variant="outline-dark" size="sm" className="rounded-circle mx-1"><FaTwitter /></Button>
          <Button variant="outline-dark" size="sm" className="rounded-circle mx-1"><FaLinkedin /></Button>
          <Button variant="outline-dark" size="sm" className="rounded-circle mx-1"><FaInstagram /></Button>
        </div>
        <p className="text-muted small mb-0">© 2025 Country Explorer. All rights reserved.</p>
      </footer>

    </>
  )
}
