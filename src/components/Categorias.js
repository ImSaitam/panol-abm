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
  Modal,
} from "react-bootstrap";
import AñadirCategoriaBoton from "./AñadirCategoriaBoton";
import AñadirSubCategoriaBoton from "./AñadirSubcategoriaBoton";
import AñadirTipoBoton from "./AñadirTipoBoton";
import axios from "axios";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showSubcategoriaModal, setShowSubcategoriaModal] = useState(false);
  const [showTipoModal, setShowTipoModal] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);
  const [subcategoriaToDelete, setSubCategoriaToDelete] = useState(null);
  const [tipoToDelete, setTipoToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubcategorias = subcategorias.filter((subcategoria) =>
    subcategoria.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTipos = tipos.filter((tipo) =>
    tipo.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoriaDelete = async () => {
    if (categoriaToDelete) {
      try {
        await axios.delete(`http://localhost:5000/categoria?id=${categoriaToDelete.id}`);
        setCategorias(categorias.filter(c => c.id !== categoriaToDelete.id));
        setShowCategoriaModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubcategoriaDelete = async () => {
    if (subcategoriaToDelete) {
      try {
        await axios.delete(`http://localhost:5000/subcategoria?id=${subcategoriaToDelete.id}`);
        setSubcategorias(subcategorias.filter(c => c.id !== subcategoriaToDelete.id));
        setShowSubcategoriaModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTipoDelete = async () => {
    if (tipoToDelete) {
      try {
        await axios.delete(`http://localhost:5000/tipo-herramienta?id=${tipoToDelete.id}`);
        setTipos(tipos.filter(c => c.id !== tipoToDelete.id));
        setShowTipoModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditClick = (item, type) => {
    setEditItem({ ...item, type });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (editItem) {
      try {
        const url = editItem.type === 'categoria' 
          ? `http://localhost:5000/categoria?id=${editItem.id}` 
          : editItem.type === 'subcategoria' 
          ? `http://localhost:5000/subcategoria?id=${editItem.id}` 
          : `http://localhost:5000/tipo-herramienta?id=${editItem.id}`;
        
        await axios.put(url, { nombre: editItem.nombre, categoriaId: editItem.categoriaId });
        
        // Update local state
        if (editItem.type === 'categoria') {
          setCategorias(categorias.map(c => c.id === editItem.id ? editItem : c));
        } else if (editItem.type === 'subcategoria') {
          setSubcategorias(subcategorias.map(s => s.id === editItem.id ? editItem : s));
        } else {
          setTipos(tipos.map(t => t.id === editItem.id ? editItem : t));
        }
        
        setShowEditModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <Button variant="secondary" className="h-75">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>
              {filteredCategorias.map((categoria) => (
                <Card key={categoria.id} className="mb-3">
                  <Card.Header
                    as="h5"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span>{categoria.nombre}</span>
                    <div className="d-flex flex-row-reverse mb-2">
                                            <Button 
                        className="ms-3" 
                        variant="primary" 
                        onClick={() => handleEditClick(categoria, 'categoria')}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick ={() => {
                          setShowCategoriaModal(true);
                          setCategoriaToDelete(categoria);
                        }}
                      >
                        Borrar
                        </Button>
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
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <Button variant="secondary" className="h-75">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>
              {filteredSubcategorias.map((subcategoria) => (
                <Card key={subcategoria.id} className="mb-3">
                  <Card.Header
                    as="h5"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span>{subcategoria.nombre}</span>
                    <div className="d-flex flex-row-reverse mb-2">
                    <Button 
                        className="ms-3" 
                        variant="primary" 
                        onClick={() => handleEditClick(subcategoria, 'subcategoria')}
                      >
                        Editar
                      </Button>
                        <Button 
                        variant="danger" 
                        onClick ={() => {
                          setShowSubcategoriaModal(true);
                          setSubCategoriaToDelete(subcategoria);
                        }}
                      >
                        Borrar
                        </Button>
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
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <Button variant="secondary" className="h-75">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>
              {filteredTipos.map((tipo) => (
                <Card key={tipo.id} className="mb-3">
                  <Card.Header
                    as="h5"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span>{tipo.nombre}</span>
                    <div className="d-flex flex-row-reverse mb-2">
                    <Button 
                        className="ms-3" 
                        variant="primary" 
                        onClick={() => handleEditClick(tipo, 'tipo')}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick ={() => {
                          setShowTipoModal(true);
                          setTipoToDelete(tipo);
                        }}
                      >
                        Borrar
                        </Button>
                    </div>
                  </Card.Header>
                </Card>
              ))}
              <AñadirTipoBoton />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar {editItem?.type === 'categoria' ? 'Categoría' : editItem?.type === 'subcategoria' ? 'Subcategoría' : 'Tipo de herramienta'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editItem?.nombre} 
                  onChange={(event) => setEditItem({ ...editItem, nombre: event.target.value })}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar cambios
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showCategoriaModal} onHide={() => setShowCategoriaModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de eliminar la categoría "{categoriaToDelete?.nombre}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCategoriaModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleCategoriaDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showSubcategoriaModal} onHide={() => setShowSubcategoriaModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de eliminar la subcategoría "{subcategoriaToDelete?.nombre}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSubcategoriaModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleSubcategoriaDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showTipoModal} onHide={() => setShowTipoModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de eliminar el tipo "{tipoToDelete?.nombre}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTipoModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleTipoDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}