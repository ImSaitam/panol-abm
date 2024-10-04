import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import AñadirCategoriaBoton from "./AñadirCategoriaBoton";
import AñadirSubCategoriaBoton from "./AñadirSubcategoriaBoton";
import AñadirTipoBoton from "./AñadirTipoBoton";
import axios from "axios";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchSubcategorias = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subcategorias");
      setSubcategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubcategorias();
  }, []);

  const fetchTipos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tipos-herramienta");
      setTipos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  return (
    <>
      <Container className="container-vista">
        <Tab.Container defaultActiveKey="category">
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
                <Col md={12}>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      className="mt-2"
                      placeholder="Buscar categoría"
                    />
                    <Button variant="secondary" className="h-75">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>
              {categorias.map((categoria) => (
                <Card key={categoria.id} className="mb-3">
                  <Card.Header
                    as="h5"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span>{categoria.nombre}</span>
                    <div className="d-flex flex-row-reverse mb-2">
                      <Button className="ms-3" variant="primary">
                        Editar
                      </Button>
                      <Button variant="danger">Borrar</Button>
                    </div>
                  </Card.Header>
                </Card>
              ))}
              <AñadirCategoriaBoton />
            </Tab.Pane>

            <Tab.Pane eventKey="subcategory">
              <Row className="mb-3">
                <Col md={12}>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      className="mt-2"
                      placeholder="Buscar subcategoría"
                    />
                    <Button variant="secondary" className="h-75">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>

              {subcategorias.map((subcategoria) => (
                <Card key={subcategoria.id} className="mb-3">
                  <Card.Header
                    as="h5"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span>{subcategoria.nombre}</span>
                    <div className="d-flex flex-row-reverse mb-2">
                      <Button className="ms-3" variant="primary">
                        Editar
                      </Button>
                      <Button variant="danger">Borrar</Button>
                    </div>
                  </Card.Header>
                </Card>
              ))}
              <AñadirSubCategoriaBoton />
            </Tab.Pane>

            <Tab.Pane eventKey="type">
              <Row className="mb-3">
                <Col md={12}>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      className="mt-2"
                      placeholder="Buscar tipo"
                    />
                    <Button variant="secondary" className="h-75">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>

              {tipos.map((tipo) => (
                <Card key={tipo.id} className="mb-3">
                  <Card.Header
                    as="h5"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span>{tipo.nombre}</span>
                    <div className="d-flex flex-row-reverse mb-2">
                      <Button className="ms-3" variant="primary">
                        Editar
                      </Button>
                      <Button variant="danger">Borrar</Button>
                    </div>
                  </Card.Header>
                </Card>
              ))}
              <AñadirTipoBoton />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </>
  );
}
