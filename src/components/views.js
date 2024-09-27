import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Form, Button, Card } from 'react-bootstrap';
import '../views.css';
import { Link } from 'react-router-dom';

export default function Vista() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');

  return (
    <Container className="container-vista">
      <Tab.Container defaultActiveKey="tools">
        <Row>
          <Col md={6}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="tools">Herramientas</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={6}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="consumables">Consumibles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Tab.Content className="mt-3">
          {/* Tab for "Herramientas" */}
          <Tab.Pane eventKey="tools">
            <Row className="mb-3">
              <Col md={3}>
                <Form.Select
                  aria-label="Categoría"
                  value={categoriaSeleccionada}
                  onChange={(e) => {
                    setCategoriaSeleccionada(e.target.value);
                    setSubcategoriaSeleccionada('');
                    setTipoSeleccionado('');
                  }}
                >
                  <option value="">Categoría</option>
                  <option value="1">Categoría 1</option>
                  <option value="2">Categoría 2</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Select
                  aria-label="Subcategoría"
                  value={subcategoriaSeleccionada}
                  onChange={(e) => {
                    setSubcategoriaSeleccionada(e.target.value);
                    setTipoSeleccionado('');
                  }}
                  disabled={!categoriaSeleccionada}
                >
                  <option value="">Subcategoría</option>
                  <option value="1">Subcategoría 1</option>
                  <option value="2">Subcategoría 2</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Select
                  aria-label="Tipo"
                  value={tipoSeleccionado}
                  onChange={(e) => setTipoSeleccionado(e.target.value)}
                  disabled={!subcategoriaSeleccionada}
                >
                  <option value="">Tipo</option>
                  <option value="1">Tipo 1</option>
                  <option value="2">Tipo 2</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Control type="text" placeholder="Buscar por nombre o id" />
              </Col>
            </Row>

            {/* Reemplazo de tabla por card con botón a la derecha */}
            <Card className="mb-3">
              <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span>Ejemplo de herramienta</span>
                <Link to="/perfil_herramienta">
                <Button variant="secondary">Ver</Button>
                </Link>
              </Card.Header>
            </Card>
          </Tab.Pane>

          {/* Tab for "Consumibles" */}
          <Tab.Pane eventKey="consumables">
            <Row className="mb-3">
              <Col md={3}>
                <Form.Select aria-label="Categoría">
                  <option>Categoría</option>
                  <option value="1">Categoría 1</option>
                  <option value="2">Categoría 2</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select aria-label="Subcategoría">
                  <option>Subcategoría</option>
                  <option value="1">Subcategoría 1</option>
                  <option value="2">Subcategoría 2</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select aria-label="Tipo">
                  <option>Tipo</option>
                  <option value="1">Tipo 1</option>
                  <option value="2">Tipo 2</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Control type="text" placeholder="Buscar por nombre o id" />
              </Col>
            </Row>

            {/* Reemplazo de tabla por card con botón a la derecha */}
            <Card className="mb-3">
              <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span>Ejemplo de consumible</span>
                <Link to="/perfil_consumible">
                <Button variant="secondary">Ver</Button>
                </Link>
              </Card.Header>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
