import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from './config';

export default function ModificarConsumible() {
  const { id } = useParams(); // Extraemos el ID de la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [consumible, setConsumible] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSubcategoria, setSelectedSubcategoria] = useState('');
  const [nombre, setNombre] = useState('');
  const [unidad, setUnidad] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagen, setImagen] = useState(null); // Para manejar la imagen
  const [imagenPreview, setImagenPreview] = useState(null); // Para la previsualización

  // Obtener los datos del consumible al cargar el componente
  useEffect(() => {
    const fetchConsumible = async () => {
      try {
        const response = await fetch(`${config}/consumible?id=${id}`);
        const data = await response.json();
        if (data.length > 0) {
          const consumibleData = data[0];
          setConsumible(consumibleData);
          setNombre(consumibleData.nombre);
          setUnidad(consumibleData.unidad);
          setCantidad(consumibleData.cantidad);
          setSelectedSubcategoria(consumibleData.subcategoria_id);
          setSelectedCategoria(consumibleData.categoria_id);
        } else {
          throw new Error('No se encontró el consumible');
        }
      } catch (err) {
        console.error('Error al obtener el consumible:', err);
      }
    };

    fetchConsumible();
  }, [id]);

  // Obtener categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${config}/categorias`);
        const data = await response.json();
        setCategorias(data);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };

    fetchCategorias();
  }, []);

  // Obtener subcategorías basadas en la categoría seleccionada
  useEffect(() => {
    const fetchSubcategorias = async () => {
      try {
        const response = await fetch(`${config}/subcategorias`);
        const data = await response.json();
        const filteredSubcategorias = data.filter(sub => sub.categoria_id === parseInt(selectedCategoria));
        setSubcategorias(filteredSubcategorias);
      } catch (err) {
        console.error('Error al obtener subcategorías:', err);
      }
    };

    if (selectedCategoria) {
      fetchSubcategorias();
    } else {
      setSubcategorias([]); // Limpiar subcategorías si no hay categoría seleccionada
    }
  }, [selectedCategoria]);

  // Manejar la selección de imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
      setImagenPreview(URL.createObjectURL(e.target.files[0])); // Generar URL para la previsualización
    }
  };

  // Abrir el selector de archivos
  const openFileDialog = () => {
    document.getElementById('imageInput').click();
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('unidad', unidad);
    formData.append('cantidad', cantidad);
    formData.append('subcategoria_id', selectedSubcategoria);
    if (imagen) formData.append('imagen', imagen);

    try {
      await axios.put(`${config}/consumible?id=${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/perfil_consumible/${id}`); // Redirigir tras la modificación exitosa
    } catch (err) {
      console.error('Error al modificar el consumible:', err);
    }
  };

  // Función para manejar la selección de categoría
  const handleCategoriaChange = (e) => {
    const selected = e.target.value;
    setSelectedCategoria(selected);
    setSelectedSubcategoria(''); // Reiniciar subcategoría
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="bg" style={{ aspectRatio: '1 / 1' }} onClick={openFileDialog}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              {imagenPreview ? (
                <img src={imagenPreview} alt="Previsualización" style={{ width: '100%', borderRadius: '8px' }} />
              ) : (
                <h2 className="text-black">EDITAR FOTO</h2>
              )}
            </Card.Body>
          </Card>
          <input
            type="file"
            id="imageInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </Col>
        <Col md={6}>
          <Card style={{ height: '80.5vh' }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="[Agregar nombre] (Obligatorio)"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Select value={selectedCategoria} onChange={handleCategoriaChange} required>
                    <option value="" disabled>Selecciona una nueva categoría</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubcategory">
                  <Form.Select
                    value={selectedSubcategoria}
                    onChange={(e) => setSelectedSubcategoria(e.target.value)}
                    disabled={!selectedCategoria}
                    required
                  >
                    <option value="" disabled>Selecciona una nueva subcategoría</option>
                    {subcategorias.map(subcategoria => (
                      <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUnidad">
                  <Form.Control
                    type="text"
                    placeholder="[Agregar nueva unidad] (Obligatorio)"
                    value={unidad}
                    onChange={(e) => setUnidad(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCantidad">
                  <Form.Control
                    type="text"
                    placeholder="[Agregar nueva cantidad] (Obligatorio)"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className='d-flex justify-content-end'>
                  <Link to={`/perfil_consumible/${id}`}><Button variant="danger" className="me-2">Cancelar</Button></Link>
                  <Button variant="primary" type="submit">Modificar</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}