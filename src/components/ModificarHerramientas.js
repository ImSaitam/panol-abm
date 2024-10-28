import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ModificarHerramienta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    observaciones: '',
    tipo_id: '',
    categoria_id: '',
    subcategoria_id: '',
    nombre: ''
  });
  const [imagePreview, setImagePreview] = useState(null);  // Previsualización de imagen
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchHerramienta = async () => {
      const response = await axios.get(`http://localhost:5000/herramienta?id=${id}`);
      const data = response.data[0];
      setFormData({
        observaciones: data.observaciones,
        tipo_id: data.tipo_id,
        categoria_id: data.categoria_id,
        subcategoria_id: data.subcategoria_id,
        nombre: data.tipo_nombre
      });
      fetchSubcategorias(data.categoria_id);
      fetchTipos(data.subcategoria_id);
    };
    fetchHerramienta();
  }, [id]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await axios.get('http://localhost:5000/categorias');
      setCategorias(response.data);
    };
    fetchCategorias();
  }, []);

  const fetchSubcategorias = async (categoriaId) => {
    const response = await axios.get('http://localhost:5000/subcategorias');
    setSubcategorias(response.data.filter(sub => sub.categoria_id === parseInt(categoriaId)));
  };

  const fetchTipos = async (subcategoriaId) => {
    const response = await axios.get('http://localhost:5000/tipos-herramienta');
    setTipos(response.data.filter(tipo => tipo.subcategoria_id === parseInt(subcategoriaId)));
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
        tipo_id: ''
      });
      setSubcategorias([]);
      setTipos([]);
    }

    if (name === 'subcategoria_id') {
      fetchTipos(value);
      setFormData({
        ...formData,
        subcategoria_id: value,
        tipo_id: ''
      });
      setTipos([]);
    }

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file)); // Vista previa de la imagen
  };

  const handleModificar = async () => {
    const valid = validateForm();
    if (!valid) return;

    const formDataToSend = new FormData();
    formDataToSend.append("observaciones", formData.observaciones);
    formDataToSend.append("tipo_id", formData.tipo_id);
    if (selectedImage) formDataToSend.append("imagen", selectedImage); // Agregar la imagen solo si se selecciona

    try {
      const response = await axios.put(`http://localhost:5000/herramienta`, formDataToSend, {
        params: { id: id },
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        alert('Herramienta modificada exitosamente');
        navigate(`/perfil_herramienta/${id}`);
      } else {
        alert('Error al modificar la herramienta');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al modificar la herramienta');
    }
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
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="bg" style={{ aspectRatio: '1 / 1' }}>
            <Card.Body className="d-flex align-items-center justify-content-center" onClick={() => document.getElementById('fileInput').click()}>
              {imagePreview ? (
                <img src={imagePreview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              ) : (
                <h2 className="text-black">EDITAR FOTO</h2>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ height: '80.5vh' }}>
            <Card.Body>
              <Form>
                {/* Selección de categoría */}
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

                {/* Selección de subcategoría */}
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

                {/* Selección de tipo */}
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

                {/* Observaciones */}
                <Form.Group className="mb-3" controlId="formObservations">
                <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name="observaciones"
                    placeholder="[Editar observaciones] (Opcional)" 
                    value={formData.observaciones}
                    onChange={handleChange}
                    style={{ resize: 'none' }}
                  />
                </Form.Group>

                <div className='d-flex justify-content-end'>
                  <Link to={`/perfil_herramienta/${id}`}><Button variant="danger" className="me-2">Cancelar</Button></Link>
                  <Button variant="primary" onClick={handleModificar}>Modificar</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}