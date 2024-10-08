import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function ModificarConsumible() {
  const { id } = useParams(); // Extraemos el ID de la URL
  const [consumible, setConsumible] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSubcategoria, setSelectedSubcategoria] = useState('');
  const [nombre, setNombre] = useState('');
  const [unidad, setUnidad] = useState('');
  const [cantidad, setCantidad] = useState('');

  // Obtener los datos del consumible al cargar el componente
  useEffect(() => {
    const fetchConsumible = async () => {
      try {
        const response = await fetch(`http://localhost:5000/consumible?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setConsumible(data[0]);
          setNombre(data[0].nombre);
          setUnidad(data[0].unidad);
          setCantidad(data[0].cantidad);
          setSelectedSubcategoria(data[0].subcategoria_id); // Establecemos la subcategoría seleccionada
          setSelectedCategoria(data[0].subcategoria_id); // Establecemos la categoría seleccionada
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
        const response = await fetch('http://localhost:5000/categorias');
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
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
        const response = await fetch('http://localhost:5000/subcategorias');
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();
        // Filtrar subcategorías basadas en la categoría seleccionada
        const filteredSubcategorias = data.filter(sub => sub.categoria_id === parseInt(selectedCategoria));
        setSubcategorias(filteredSubcategorias);
      } catch (err) {
        console.error('Error al obtener subcategorías:', err);
      }
    };

    if (selectedCategoria) {
      fetchSubcategorias();
    } else {
      setSubcategorias([]); // Limpiamos subcategorías si no hay categoría seleccionada
    }
  }, [selectedCategoria]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const consumibleData = {
      nombre,
      unidad,
      cantidad,
      subcategoria_id: selectedSubcategoria,
      imagen: '' // Aquí podrías agregar lógica para manejar imágenes si es necesario
    };

    try {
      const response = await fetch(`http://localhost:5000/consumible?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consumibleData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }

      alert('Consumible modificado exitosamente');
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
          <Card className="bg-success" style={{ aspectRatio: '1 / 1' }}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <h2 className="text-white">EDITAR FOTO</h2>
            </Card.Body>
          </Card>
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
                  <Form.Select
                    value={selectedCategoria}
                    onChange={handleCategoriaChange}
                    required
                  >
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
                    disabled={!selectedCategoria} // Deshabilitar si no hay categoría seleccionada
                    required
                  >
                    <option value="" disabled>Selecciona una nueva subcategoría</option>
                    {subcategorias.map(subcategoria => (
                      <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 has-validation" controlId="formUnidad">
                  <Form.Control
                    type="text"
                    placeholder="[Agregar nueva unidad] (Obligatorio)"
                    value={unidad}
                    onChange={(e) => setUnidad(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 has-validation" controlId="formCantidad">
                  <Form.Control
                    type="text"
                    placeholder="[Agregar nueva cantidad] (Obligatorio)"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                  <Link to="/perfil_consumible"><Button variant="danger" className="me-2">Cancelar</Button></Link>
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