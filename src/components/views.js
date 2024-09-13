import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Form, Button, Table } from 'react-bootstrap';
import '../views.css';

export default function Vista() {
  // Definimos los estados para almacenar la selección actual de categoría y subcategoría
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState('');

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
              {/* Dropdown para Categoría */}
              <Col md={3}>
                <Form.Select
                  aria-label="Categoría"
                  value={categoriaSeleccionada}
                  onChange={(e) => {
                    setCategoriaSeleccionada(e.target.value);
                    setSubcategoriaSeleccionada(''); // Reseteamos subcategoría cuando se cambia la categoría
                  }}
                >
                  <option value="">Categoría</option>
                  <option value="1">Categoría 1</option>
                  <option value="2">Categoría 2</option>
                </Form.Select>
              </Col>

              {/* Dropdown para Subcategoría, se habilita solo si hay una categoría seleccionada */}
              <Col md={3}>
                <Form.Select
                  aria-label="Subcategoría"
                  value={subcategoriaSeleccionada}
                  onChange={(e) => setSubcategoriaSeleccionada(e.target.value)}
                  disabled={!categoriaSeleccionada} // Se deshabilita si no se ha seleccionado una categoría
                >
                  <option value="">Subcategoría</option>
                  <option value="1">Subcategoría 1</option>
                  <option value="2">Subcategoría 2</option>
                </Form.Select>
              </Col>

              {/* Dropdown para Tipo, se habilita solo si hay una subcategoría seleccionada */}
              <Col md={3}>
                <Form.Select
                  aria-label="Tipo"
                  disabled={!subcategoriaSeleccionada} // Se deshabilita si no se ha seleccionado una subcategoría
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

            {/* Table for displaying tools */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre de herramienta</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ejemplo de herramienta</td>
                  <td>
                    <Button variant="secondary">Ver</Button>
                  </td>
                </tr>
              </tbody>
            </Table>

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

            {/* Table for displaying consumables */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre de consumible</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ejemplo de consumible</td>
                  <td>
                    <Button variant="secondary">Ver</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
