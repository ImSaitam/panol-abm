import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ModificarHerramienta() {
  const { id } = useParams();  // Extraer el id de la URL
  const navigate = useNavigate();  // Para redirigir después de modificar
  const [formData, setFormData] = useState({
    imagen: '',
    observaciones: '',
    tipo_id: '',
    categoria_id: '',
    subcategoria_id: '',
    nombre: ''
  });

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [errors, setErrors] = useState({}); // Estado para errores

  useEffect(() => {
    const fetchHerramienta = async () => {
      const response = await fetch(`http://localhost:5000/herramienta?id=${id}`);
      const data = await response.json();
      setFormData({
        imagen: data.imagen,
        observaciones: data.observaciones,
        tipo_id: data.tipo_id,
        categoria_id: data.categoria_id,
        subcategoria_id: data.subcategoria_id,
        nombre: data.nombre // Asumiendo que también tienes un campo "nombre"
      });
      fetchSubcategorias(data.categoria_id);
      fetchTipos(data.subcategoria_id);
    };
    fetchHerramienta();
  }, [id]);

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

    // Fetch subcategorías cuando se selecciona una categoría
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

    // Fetch tipos cuando se selecciona una subcategoría
    if (name === 'subcategoria_id') {
      fetchTipos(value);
      setFormData({
        ...formData,
        subcategoria_id: value,
        tipo_id: '' // Reinicia tipo al cambiar subcategoría
      });
      setTipos([]); // Limpia tipos
    }

    // Limpia el mensaje de error al cambiar el valor del campo
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['nombre', 'categoria_id', 'subcategoria_id', 'tipo_id'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleModificar = async () => {
    if (!validateForm()) {
      return; // No enviar el formulario si hay errores
    }

    try {
      const response = await fetch(`http://localhost:5000/herramienta?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Herramienta modificada exitosamente');
        navigate(`/perfil_herramienta/${id}`);  // Redirige de vuelta al perfil de la herramienta
      } else {
        alert('Error al modificar la herramienta');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al modificar la herramienta');
    }
  };

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
          <Card style={{ height: '80.5vh' }}>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Control 
                    type="text" 
                    placeholder="[Agregar nombre] (Obligatorio)" 
                    name="nombre"
                    value={formData.nombre} 
                    onChange={handleChange}
                    isInvalid={!!errors.nombre} // Muestra error si existe
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Select 
                    name="categoria_id" 
                    value={formData.categoria_id} 
                    onChange={handleChange}
                    isInvalid={!!errors.categoria_id} // Muestra error si existe
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
                    isInvalid={!!errors.subcategoria_id} // Muestra error si existe
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
                    isInvalid={!!errors.tipo_id} // Muestra error si existe
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
                    placeholder="[Agregar observaciones](Opcional)" 
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <div className='d-flex justify-content-end'>
            <Link to={`/perfil_herramienta/${id}`}><Button variant="danger" className="me-2">Cancelar</Button></Link>
            <Button variant="primary" onClick={handleModificar}>Modificar</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
