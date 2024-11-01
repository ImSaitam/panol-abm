import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from './config';

export default function PerfilConsumible() {
  const { id } = useParams(); // Extraemos el ID de la URL
  const [consumible, setConsumible] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  // Petición para obtener los datos del consumible
  useEffect(() => {
    const fetchConsumible = async () => {
      try {
        const response = await axios.get(`${config}/consumible`, {
          params: { id }
        });

        if (response.data.length > 0) {
          setConsumible(response.data[0]); // Guardamos el consumible si hay datos
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

  const handleDeactivate = async () => {
    try {
      await axios.delete(`${config}/consumible`, { params: { id } });
      alert('Consumible dado de baja.');
      window.location.href = "/ver";
      handleClose();
    } catch (error) {
      console.error('Error al eliminar el consumible:', error);
      alert('Error al eliminar el consumible.');
    }
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
            <Card style={{ aspectRatio: '1 / 1' , border: 'none'}}>
              <Card.Body 
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '100%',  // Ancho en porcentaje
                  height: '100%', // Alto en porcentaje
                }}
              >
                <img
                    src={`${config}/uploads/${consumible.imagen}`}
                  alt="Herramienta"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    minWidth: '50%',    // Tamaño mínimo para agrandar imágenes pequeñas
                    minHeight: '50%',   // Tamaño mínimo para agrandar imágenes pequeñas
                    objectFit: 'contain'
                  }}
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