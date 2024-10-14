import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function PerfilHerramienta() {
  const { id } = useParams();  
  const [herramienta, setHerramienta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchHerramienta = async () => {
      try {
        const response = await fetch(`http://localhost:5000/herramienta?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos obtenidos:', data);  // Depurando la respuesta

        if (data.length > 0) {
          setHerramienta(data[0]);  // Guardamos la primera herramienta si hay datos
        } else {
          throw new Error('No se encontró ninguna herramienta con ese ID');
        }
      } catch (err) {
        console.error('Error al obtener la herramienta:', err);
        setError(err.message);  // Guardamos el error en el estado
      }
    };

    fetchHerramienta();
  }, [id]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDeactivate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/herramienta?id=${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al dar de baja la herramienta');
      }
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      alert('Herramienta dada de baja exitosamente.');
      
      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al dar de baja la herramienta.');
    }
  };
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container className="mt-4">
      {herramienta ? (
        <>
          <Row>
            <Col md={6}>
              <Card className="bg-success" style={{ aspectRatio: '1 / 1' }}>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <img src={`http://localhost:5000/static/images/${herramienta.imagen}`} alt="Herramienta" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ height: '80.5vh'}}>
                <Card.Body>
                  <h2 className="mb-4">{herramienta.tipo_nombre} #{herramienta.id}</h2>
                  <p><strong>Categoría:</strong> {herramienta.categoria_nombre}</p>
                  <p><strong>Subcategoría:</strong> {herramienta.subcategoria_nombre}</p>
                  <p><strong>Tipo:</strong> {herramienta.tipo_nombre}</p>
                  <p><strong>Observaciones:</strong> {herramienta.observaciones}</p>
                </Card.Body>
              </Card>
              <div className='d-flex justify-content-end'>
              <Link to={`/ver`}>
              <Button variant="secondary" className="me-2">Volver</Button>
              </Link>  
              <Link to={`/modificar_herramienta/${herramienta.id}`}>
              <Button variant="primary" className="me-2">Modificar</Button>
              </Link>
                <Button variant="danger" onClick={handleShow}>Dar de baja</Button>
              </div>
            </Col>
          </Row>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Dar de baja herramienta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Desea dar de baja la herramienta {herramienta.tipo_nombre} #{herramienta.id}?
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
        <p>Cargando herramienta...</p>
      )}
    </Container>
  );
}