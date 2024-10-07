import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SubirConsumibles() {
  const [formData, setFormData] = useState({
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
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Control type="text" placeholder="[Agregar nombre] (Obligatorio)" />
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

                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control 
                    type="text" 
                    placeholder="[Agregar unidad](Obligatorio)" 
                  />
                </Form.Group>
                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control 
                    type="text" 
                    placeholder="[Agregar cantidad](Obligatorio)" 
                  />
                </Form.Group>
                </Form>
            </Card.Body>
          </Card>
          <div className='d-flex justify-content-end'>
            <Link to="/perfil_consumible"><Button variant="danger" className="me-2">Cancelar</Button></Link>
            <Button variant="primary">Subir</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}