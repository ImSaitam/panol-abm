import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SubirConsumibles() {
  const [formData, setFormData] = useState({
    imagen: "",
    categoria_id: "",
    subcategoria_id: "",
    nombre: "",
    unidad: "",
    cantidad: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [errors, setErrors] = useState({}); // Estado para errores

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
      });
      setTipos([]); // Limpia tipos
    }

    // Limpia el mensaje de error al cambiar el valor del campo
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      delete formData.categoria_id;
      delete formData.tipo_id;
      const response = await axios.post('http://localhost:5000/consumible', formData, {
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
          <Card className="bg-success" style={{ aspectRatio: '1 / 1' }}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <h2 className="text-white">AGREGAR FOTO</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ height: '80.5vh'}}>
            <Card.Body>
            <Form onSubmit={handleSubmit}>
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
                  <Form.Control 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    placeholder='Agregar nombre'
                  >
                  
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control 
                    type="text" 
                    name="unidad"
                    placeholder="[Agregar unidad](Obligatorio)" 
                    value={formData.unidad} 
                    onChange={handleChange} 
                  />
                </Form.Group>
                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control 
                    type="text" 
                    name='cantidad'
                    placeholder="[Agregar cantidad](Obligatorio)" 
                    value={formData.cantidad} 
                    onChange={handleChange} 
                  />
                </Form.Group>
                <div className='d-flex justify-content-end'>
            <Link to="/ver"><Button variant="danger" className="me-2">Cancelar</Button></Link>
            <Button type='submit' variant="primary">Subir</Button>
          </div>
                </Form>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </Container>
  )
}