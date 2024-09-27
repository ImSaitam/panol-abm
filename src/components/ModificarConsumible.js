import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ModificarConsumible() {
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
                  <Form.Control type="text" placeholder="[Agregar nombre] (Obligatorio)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Select>
                    <option selected disabled>Selecciona una nueva categoría</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubcategory">
                <Form.Select>
                    <option selected disabled>Selecciona una nueva subcategoría</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formType">
                  <Form.Select>
                    <option selected disabled>Selecciona un nuevo tipo</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control 
                    type="text" 
                    placeholder="[Agregar nueva unidad](Obligatorio)" 
                  />
                </Form.Group>
                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control 
                    type="text" 
                    placeholder="[Agregar nueva cantidad](Obligatorio)" 
                  />
                </Form.Group>
                </Form>
            </Card.Body>
          </Card>
          <div className='d-flex justify-content-end'>
            <Link to="/perfil_herramienta"><Button variant="danger" className="me-2">Cancelar</Button></Link>
            <Button variant="primary">Modificar</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}