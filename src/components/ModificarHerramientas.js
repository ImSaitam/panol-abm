import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Component() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="bg-success" style={{ aspectRatio: '1 / 1' }}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <h2 className="text-white">EDITAR FOTO</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ height: '80.5vh'}}>
            <Card.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Control type="text" placeholder="[Campo de texto para modificar nombre]" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Control type="text" placeholder="Selecciona una categoría" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubcategory">
                  <Form.Control type="text" placeholder="Selecciona una subcategoría" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formType">
                  <Form.Control type="text" placeholder="Selecciona un tipo" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formObservations">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="[Campo de texto para modificar observaciones]" 
                  />
                </Form.Group>
                </Form>
            </Card.Body>
          </Card>
          <div className='d-flex justify-content-end'>
            <Link to="/perfil"><Button variant="danger" className="me-2">Cancelar</Button></Link>
            <Button variant="primary">Modificar</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}