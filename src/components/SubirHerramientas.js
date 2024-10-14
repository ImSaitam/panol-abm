import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function SubirHerramienta() {
  const [formData, setFormData] = useState({
    imagen: '',
    categoria_id: '',
    subcategoria_id: '',
    tipo_id: '',
    observaciones: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [errors, setErrors] = useState({}); // Estado para errores

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch('http://localhost:5000/categorias');
      const data = await response.json();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const fetchSubcategorias = async (categoriaId) => {
    const response = await fetch(`http://localhost:5000/subcategorias`);
    const data = await response.json();
    const filteredSubcategorias = data.filter(sub => sub.categoria_id === parseInt(categoriaId));
    setSubcategorias(filteredSubcategorias);
  };

  const fetchTipos = async (subcategoriaId) => {
    const response = await fetch('http://localhost:5000/tipos-herramienta');
    const data = await response.json();
    const filteredTipos = data.filter(tipo => tipo.subcategoria_id === parseInt(subcategoriaId));
    setTipos(filteredTipos);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'categoria_id') {
      fetchSubcategorias(value);
      setFormData({
        ...formData,
        categoria_id: value,
        subcategoria_id: '',  // Reinicia subcategoría al cambiar categoría
        tipo_id: ''           // Reinicia tipo al cambiar subcategoría
      });
      setSubcategorias([]); // Limpia subcategorías
      setTipos([]);         // Limpia tipos
    }

    if (name === 'subcategoria_id') {
      fetchTipos(value);
      setFormData({
        ...formData,
        subcategoria_id: value,
        tipo_id: '' // Reinicia tipo al cambiar subcategoría
      });
      setTipos([]); // Limpia tipos
    }

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      delete formData.categoria_id;
      delete formData.subcategoria_id;
      delete formData.image;
      const response = await axios.post('http://localhost:5000/herramienta', formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 201) {
        console.log('Herramienta subida exitosamente');
      }
    }
    catch (error) {
      console.error('Error al subir herramienta', error);
      console.log(formData)
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="bg-success pe-auto" role='button'  onClick={handleModalOpen} style={{ aspectRatio: '1 / 1' }}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              {formData.image ? (
                <img src={URL.createObjectURL(formData.image)} alt="Imagen seleccionada" />
              ) : (
                <h2 className="text-white">
                  AGREGAR FOTO
                </h2>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ height: '80.5vh' }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Select 
                    name="categoria_id" 
                    value={formData.categoria_id} 
                    onChange={handleChange}
                    isInvalid={!!errors.categoria_id}
                  >
                    <option value="" disabled>Selecciona una categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.categoria_id}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubcategory">
                  <Form.Select 
                    name="subcategoria_id" 
                    value={formData.subcategoria_id} 
                    onChange={handleChange} 
                    disabled={!formData.categoria_id}
                    isInvalid={!!errors.subcategoria_id}
                  >
                    <option value="" disabled>Selecciona una subcategoría</option>
                    {subcategorias.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.subcategoria_id}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formType">
                  <Form.Select 
                    name="tipo_id" 
                    value={formData.tipo_id} 
                    onChange={handleChange} 
                    disabled={!formData.subcategoria_id}
                    isInvalid={!!errors.tipo_id}
                  >
                    <option value="" disabled>Selecciona un tipo</option>
                    {tipos.map(tipo => (
                      <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.tipo_id}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formObservations">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="observaciones"
                    placeholder="[Agregar observaciones] (Opcional)" 
                    value={formData.observaciones}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className='d-flex justify-content-end'>
                  <Link to="/ver"><Button variant="danger" className="me-2">Cancelar</Button></Link>
                  <Button type="submit" variant="primary">Subir</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Seleccionar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}