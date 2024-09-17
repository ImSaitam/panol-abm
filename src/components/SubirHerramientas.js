import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SubirHerramienta() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="bg-success" style={{ aspectRatio: '1 / 1' }}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <h2 className="text-white">AGREGAR FOTO</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ height: '80.5vh'}}>
            <Card.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Control type="text" placeholder="[Agregar nombre] (Obligatorio)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Select>
                    <option selected disabled>Selecciona una categoría</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubcategory">
                <Form.Select>
                    <option selected disabled>Selecciona una subcategoría</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formType">
                  <Form.Select>
                    <option selected disabled>Selecciona un tipo</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formObservations">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="[Agregar observaciones](Opcional)" 
                  />
                </Form.Group>
                </Form>
            </Card.Body>
          </Card>
          <div className='d-flex justify-content-end'>
            <Link to="/perfil"><Button variant="danger" className="me-2">Cancelar</Button></Link>
            <Button variant="primary">Subir</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}