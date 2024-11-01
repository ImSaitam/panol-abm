import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { config } from './config';

export default function SubirConsumibles() {
  const [formData, setFormData] = useState({
    imagen: null,
    categoria_id: "",
    subcategoria_id: "",
    nombre: "",
    unidad: "",
    cantidad: "",
  });
  const [imagenPrevisualizacion, setImagenPrevisualizacion] = useState(null); // Estado para previsualización
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch(`${config}/categorias`);
      const data = await response.json();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const fetchSubcategorias = async (categoriaId) => {
    const response = await fetch(`${config}/subcategorias`);
    const data = await response.json();
    const filteredSubcategorias = data.filter(sub => sub.categoria_id === parseInt(categoriaId));
    setSubcategorias(filteredSubcategorias);
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
        subcategoria_id: '',
      });
      setSubcategorias([]);
    }

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imagen: file
    });

    // Crear una URL de objeto para la previsualización
    if (file) {
      setImagenPrevisualizacion(URL.createObjectURL(file));
    } else {
      setImagenPrevisualizacion(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("unidad", formData.unidad);
    data.append("cantidad", formData.cantidad);
    data.append("subcategoria_id", formData.subcategoria_id);
    if (formData.imagen) data.append("imagen", formData.imagen);

    try {
      const response = await axios.post(`${config}/consumible`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      if (response.status === 201) {
        console.log('Consumible subido exitosamente');
        window.location.href = "/ver";
      }
    } catch (error) {
      console.error('Error al subir el consumible', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card
            className="bg"
            style={{ aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden' }} // Para mantener el contenedor
            onClick={() => document.getElementById('fileInput').click()}
          >
            {imagenPrevisualizacion ? (
              <img
                src={imagenPrevisualizacion}
                alt="Previsualización"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain' 
                }}
              />
            ) : (
              <Card.Body className="d-flex align-items-center justify-content-center">
                <h2 className="text-black">AGREGAR FOTO</h2>
              </Card.Body>
            )}
          </Card>
          <Form.Control
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
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
                  <Form.Control
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Agregar nombre"
                  />
                </Form.Group>
                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control
                    type="text"
                    name="unidad"
                    placeholder="Agregar unidad (Obligatorio)"
                    value={formData.unidad}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 has-validation" controlId="formCantidad">
                  <Form.Control
                    type="text"
                    name="cantidad"
                    placeholder="Agregar cantidad (Obligatorio)"
                    value={formData.cantidad}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Link to="/ver"><Button variant="danger" className="me-2">Cancelar</Button></Link>
                  <Button type="submit" variant="primary">Subir</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}