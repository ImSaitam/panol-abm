import React from 'react';
import { Container, Row, Col, Tab, Nav, Form, Button, Card } from 'react-bootstrap';

export default function Categorias() {

  return (
    <Container className="container-vista">
      <Tab.Container defaultActiveKey="tools">
        <Row>
          <Col md={4}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="category">Categoría</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={4}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="subcategory">Subcategoría</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={4}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="type">Tipo</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="category">
            <Row className="mb-3">
              <Col md={11}>
              <div className='d-flex'>
                <Form.Control type="text" placeholder="Buscar categoría" />
                <Button variant='secondary'>Buscar</Button>
                </div>
              </Col>
            </Row>

            {/* Reemplazo de tabla por card con botón a la derecha */}
            <Card className="mb-3">
              <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span>Ejemplo de Categoría</span>
                <Button variant="secondary">Ver</Button>
              </Card.Header>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="subcategory">
            <Row className="mb-3">
              <Col md={11}>
              <div className='d-flex'>
                <Form.Control type="text" placeholder="Buscar subcategoría" />
                <Button variant='secondary'>Buscar</Button>
                </div>
              </Col>
            </Row>

            {/* Reemplazo de tabla por card con botón a la derecha */}
            <Card className="mb-3">
              <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span>Ejemplo de subcategoría</span>
                <Button variant="secondary">Ver</Button>
              </Card.Header>
            </Card>
          </Tab.Pane>

          {/* Tab for "Consumibles" */}
          <Tab.Pane eventKey="type">
          <Row className="mb-3">
              <Col md={11}>
              <div className='d-flex'>
                <Form.Control type="text" placeholder="Buscar tipo" />
                <Button variant='secondary'>Buscar</Button>
                </div>
              </Col>
            </Row>

            {/* Reemplazo de tabla por card con botón a la derecha */}
            <Card className="mb-3">
              <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span>Ejemplo de tipo</span>
                <Button variant="secondary">Ver</Button>
              </Card.Header>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
