import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function PerfilConsumible() {
  const { id } = useParams(); // Extraemos el ID de la URL
  const [consumible, setConsumible] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  // Petición para obtener los datos del consumible
  useEffect(() => {
    const fetchConsumible = async () => {
      try {
        const response = await fetch(`http://localhost:5000/consumible?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos obtenidos:', data); // Depurando la respuesta

        if (data.length > 0) {
          setConsumible(data[0]); // Guardamos la primera herramienta si hay datos
        } else {
          throw new Error('No se encontró ningún consumible con ese ID');
        }
      } catch (err) {
        console.error('Error al obtener el consumible:', err);
        setError(err.message); // Guardamos el error en el estado
      }
    };

    fetchConsumible();
  }, [id]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDeactivate = () => {
    alert('Consumible dado de baja.');
    handleClose();
  };

  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container className="mt-4">
      {consumible ? (
        <>
          <Row>
            <Col md={6}>
              <Card className="bg-success" style={{ aspectRatio: '1 / 1' }}>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <img
                    src={`http://localhost:5000/static/images/${consumible.imagen}`}
                    alt="Consumible"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ height: '80.5vh' }}>
                <Card.Body>
                  <h2 className="mb-4">{consumible.nombre} #{consumible.id}</h2>
                  <p><strong>Categoría:</strong> {consumible.categoria_nombre}</p>
                  <p><strong>Subcategoría:</strong> {consumible.subcategoria_nombre}</p>
                  <p><strong>Unidad:</strong> {consumible.unidad}</p>
                  <p><strong>Cantidad:</strong> {consumible.cantidad}</p>
                </Card.Body>
              </Card>
              <div className='d-flex justify-content-end'>
              <Link to={`/ver`}>
              <Button variant="secondary" className="me-2">Volver</Button>
              </Link>  
                <Link to={`/modificar_consumible/${consumible.id}`}>
                  <Button variant="primary" className="me-2">Modificar</Button>
                </Link>
                <Button variant="danger" onClick={handleShow}>Dar de baja</Button>
              </div>
            </Col>
          </Row>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Dar de baja consumible</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Desea dar de baja el consumible {consumible.nombre} #{consumible.id}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleDeactivate}>
                Dar de baja
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>Cargando consumible...</p>
      )}
    </Container>
  );
}