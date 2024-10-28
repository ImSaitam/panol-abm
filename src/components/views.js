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
import "../views.css";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function Vista() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [herramientas, setHerramientas] = useState([]);
  const [consumibles, setConsumibles] = useState([]);
  const [herramientasBajas, setHerramientasBajas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Estados para almacenar categorías, subcategorías y tipos
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tiposBajas, setTiposBajas] = useState([]); // Tipos para herramientas dadas de baja

  // Cargar categorías desde el endpoint
  useEffect(() => {
    axios
      .get(`${API_URL}/categorias`)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar categorías", error);
      });
  }, []);

  // Cargar herramientas desde el endpoint
  useEffect(() => {
    axios
      .get(`${API_URL}/herramientas`)
      .then((response) => {
        setHerramientas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar herramientas", error);
      });
  }, []);

  // Cargar consumibles desde el endpoint
  useEffect(() => {
    axios
      .get(`${API_URL}/consumibles`)
      .then((response) => {
        setConsumibles(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar consumibles", error);
      });
  }, []);

  // Cargar herramientas dadas de baja desde el endpoint
  useEffect(() => {
    axios
      .get(`${API_URL}/herramientas-bajas`)
      .then((response) => {
        setHerramientasBajas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar herramientas dadas de baja", error);
      });
  }, []);

  // Cargar subcategorías cuando se selecciona una categoría
  useEffect(() => {
    if (categoriaSeleccionada) {
      axios
        .get(`${API_URL}/subcategorias`)
        .then((response) => {
          const filteredSubcategorias = response.data.filter(
            (sub) => sub.categoria_id === parseInt(categoriaSeleccionada)
          );
          setSubcategorias(filteredSubcategorias);
          setSubcategoriaSeleccionada("");
          setTipoSeleccionado("");
        })
        .catch((error) => {
          console.error("Error al cargar subcategorías", error);
        });
    } else {
      setSubcategorias([]);
    }
  }, [categoriaSeleccionada]);

  // Cargar tipos cuando se selecciona una subcategoría
  useEffect(() => {
    if (subcategoriaSeleccionada) {
      axios
        .get(`${API_URL}/tipos-herramienta`)
        .then((response) => {
          const filteredTipos = response.data.filter(
            (tipo) =>
              tipo.subcategoria_id === parseInt(subcategoriaSeleccionada)
          );
          setTipos(filteredTipos);
          setTipoSeleccionado("");
        })
        .catch((error) => {
          console.error("Error al cargar tipos", error);
        });
    } else {
      setTipos([]);
    }
  }, [subcategoriaSeleccionada]);

  // Cargar tipos para herramientas dadas de baja
  useEffect(() => {
    if (subcategoriaSeleccionada) {
      axios
        .get(`${API_URL}/tipos-herramienta`)
        .then((response) => {
          const filteredTiposBajas = response.data.filter(
            (tipo) => tipo.subcategoria_id === parseInt(subcategoriaSeleccionada)
          );
          setTiposBajas(filteredTiposBajas);
        })
        .catch((error) => {
          console.error("Error al cargar tipos de bajas", error);
        });
    } else {
      setTiposBajas([]);
    }
  }, [subcategoriaSeleccionada]);

  // Filtrar herramientas según las selecciones y la búsqueda
  const herramientasFiltradas = herramientas.filter((herramienta) => {
    return (
      (!categoriaSeleccionada ||
        herramienta.categoria_id === parseInt(categoriaSeleccionada)) &&
      (!subcategoriaSeleccionada ||
        herramienta.subcategoria_id === parseInt(subcategoriaSeleccionada)) &&
      (!tipoSeleccionado ||
        herramienta.tipo_id === parseInt(tipoSeleccionado)) &&
      (!busqueda ||
        (herramienta.tipo_nombre &&
          herramienta.tipo_nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())) ||
        herramienta.id === parseInt(busqueda))
    );
  });

  // Filtrar consumibles según las selecciones y la búsqueda
  const consumiblesFiltrados = consumibles.filter((consumible) => {
    return (
      (!categoriaSeleccionada ||
        consumible.categoria_id === parseInt(categoriaSeleccionada)) &&
      (!subcategoriaSeleccionada ||
        consumible.subcategoria_id === parseInt(subcategoriaSeleccionada)) &&
      (!busqueda ||
        (consumible.nombre &&
          consumible.nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
        consumible.id === parseInt(busqueda))
    );
  });

  // Filtrar herramientas dadas de baja según la búsqueda
  const herramientasBajasFiltradas = herramientasBajas.filter((herramienta) => {
    return (
      (!categoriaSeleccionada ||
        herramienta.categoria_id === parseInt(categoriaSeleccionada)) &&
      (!subcategoriaSeleccionada ||
        herramienta.subcategoria_id === parseInt(subcategoriaSeleccionada)) &&
      (!tipoSeleccionado ||
        herramienta.tipo_id === parseInt(tipoSeleccionado)) &&
      (!busqueda ||
        (herramienta.tipo_nombre &&
          herramienta.tipo_nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())) ||
        herramienta.id === parseInt(busqueda))
    );
  });
  return (
    <Container className="container-vista">
    <Tab.Container defaultActiveKey="tools">
      <Row>
        <Col>
          <Nav variant="tabs" className="w-100 d-flex">
            <Nav.Item style={{ flex: '0 0 43%', marginRight: '6px' }}>
              <Nav.Link eventKey="tools">Herramientas</Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ flex: '0 0 43%', marginRight: '6px' }}>
              <Nav.Link eventKey="consumables">Consumibles</Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ flex: '0 0 13.3%' }}>
              <Nav.Link eventKey="bajas">Herramientas dadas de baja</Nav.Link>
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
                  }}
                >
                  <option value="">Categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Select
                  aria-label="Subcategoría"
                  value={subcategoriaSeleccionada}
                  onChange={(e) => {
                    setSubcategoriaSeleccionada(e.target.value);
                  }}
                  disabled={!categoriaSeleccionada}
                >
                  <option value="">Subcategoría</option>
                  {subcategorias.map((subcategoria) => (
                    <option key={subcategoria.id} value={subcategoria.id}>
                      {subcategoria.nombre}
                    </option>
                  ))}
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
                  {tipos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Col>
  
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre o id"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)} // Manejar la búsqueda
                />
              </Col>
            </Row>
            {/* Mostrar herramientas filtradas */}
            {herramientasFiltradas.map((herramienta) => (
              <Card className="mb-3" key={herramienta.id}>
                <Card.Header
                  as="h5"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {herramienta.tipo_nombre} ID: #{herramienta.id}
                  </span>
                  <Link to={`/perfil_herramienta/${herramienta.id}`}>
                    <Button variant="secondary">Ver</Button>
                  </Link>
                </Card.Header>
              </Card>
            ))}
            <div className="fixed-bottom d-flex justify-content-end mb-3">
              <Link to="/subir_herramientas">
                <Button variant="secondary" className="add-button">
                  <i className="bi bi-plus-lg">+</i>
                </Button>
              </Link>
            </div>
          </Tab.Pane>
  
          {/* Tab for "Consumibles" */}
          <Tab.Pane eventKey="consumables">
            <Row className="mb-3">
              <Col md={3}>
                <Form.Select
                  aria-label="Categoría"
                  value={categoriaSeleccionada}
                  onChange={(e) => {
                    setCategoriaSeleccionada(e.target.value);
                  }}
                >
                  <option value="">Categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Col>
  
              <Col md={3}>
                <Form.Select
                  aria-label="Subcategoría"
                  value={subcategoriaSeleccionada}
                  onChange={(e) => {
                    setSubcategoriaSeleccionada(e.target.value);
                  }}
                  disabled={!categoriaSeleccionada}
                >
                  <option value="">Subcategoría</option>
                  {subcategorias.map((subcategoria) => (
                    <option key={subcategoria.id} value={subcategoria.id}>
                      {subcategoria.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Col>
  
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre o id"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)} // Manejar la búsqueda
                />
              </Col>
            </Row>
  
            {/* Mostrar consumibles filtrados */}
            {consumiblesFiltrados.map((consumible) => (
              <Card className="mb-3" key={consumible.id}>
                <Card.Header
                  as="h5"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {consumible.nombre} ID: #{consumible.id}
                  </span>
                  <Link to={`/perfil_consumible/${consumible.id}`}>
                    <Button variant="secondary">Ver</Button>
                  </Link>
                </Card.Header>
              </Card>
            ))}
            <div className="fixed-bottom d-flex justify-content-end mb-3">
              <Link to="/subir_consumibles">
                <Button variant="secondary" className="add-button">
                  <i className="bi bi-plus-lg">+</i>
                </Button>
              </Link>
            </div>
          </Tab.Pane>
  
          {/* Tab for "Herramientas dadas de baja" */}
          <Tab.Pane eventKey="bajas">
            <Row className="mb-3">
              <Col md={3}>
                <Form.Select
                  aria-label="Categoría"
                  value={categoriaSeleccionada}
                  onChange={(e) => {
                    setCategoriaSeleccionada(e.target.value);
                  }}
                >
                  <option value="">Categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Select
                  aria-label="Subcategoría"
                  value={subcategoriaSeleccionada}
                  onChange={(e) => {
                    setSubcategoriaSeleccionada(e.target.value);
                  }}
                  disabled={!categoriaSeleccionada}
                >
                  <option value="">Subcategoría</option>
                  {subcategorias.map((subcategoria) => (
                    <option key={subcategoria.id} value={subcategoria.id}>
                      {subcategoria.nombre}
                    </option>
                  ))}
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
                  {tiposBajas.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </Col>
            </Row>
            {/* Mostrar herramientas dadas de baja filtradas */}
            {herramientasBajasFiltradas.map((herramienta) => (
              <Card className="mb-3" key={herramienta.id}>
                <Card.Header
                  as="h5"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {herramienta.tipo_nombre} ID: #{herramienta.id}
                  </span>
                  <Link to={`/perfil_herramienta_baja/${herramienta.id}`}>
                    <Button variant="secondary">Ver</Button>
                  </Link>
                </Card.Header>
              </Card>
            ))}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );  
}