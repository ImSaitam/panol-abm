import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function SubirHerramienta() {
  const [formData, setFormData] = useState({
    imagen: '',
    categoria_id: '',
    subcategoria_id: '',
    tipo_id: '',
    observaciones: null
  });
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    setFormData({ ...formData, imagen: event.target.files[0] });
  };

  const handleClick = () => {
    fileInputRef.current.click();
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
    const data = new FormData();
    data.append('observaciones', formData.observaciones);
    data.append('tipo_id', formData.tipo_id);
    data.append('imagen', formData.imagen);

    try {
      const response = await axios.post('http://localhost:5000/herramienta', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      if (response.status === 201) {
        console.log('Herramienta subida exitosamente');
        window.location.href = "/ver";
      }
    }
    catch (error) {
      console.error('Error al subir herramienta', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card 
            className="bg" 
            role='button'  
            onClick={handleClick} 
            style={{ aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden' }} 
          >
            <Card.Body className="d-flex align-items-center justify-content-center">
              {formData.imagen ? (
                <img 
                  src={URL.createObjectURL(formData.imagen)} 
                  alt="Imagen seleccionada" 
                  style={{ 
                    width: '100%',   // Ajusta el ancho al 100% del contenedor
                    height: '100%',  // Ajusta la altura al 100% del contenedor
                    objectFit: 'contain' // Cubre todo el contenedor sin distorsionarse
                  }} 
                />
              ) : (
                <h2 className="text-black">
                  AGREGAR FOTO
                </h2>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
                accept="image/*" 
              />
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
                    rows={4} 
                    name="observaciones"
                    placeholder="[Agregar observaciones] (Opcional)" 
                    value={formData.observaciones}
                    onChange={handleChange}
                    style={{ resize: 'none' }}
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
    </Container>
  );
}