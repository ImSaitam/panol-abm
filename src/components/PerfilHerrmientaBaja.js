import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PerfilHerramientaBaja() {
  const { id } = useParams();  
  const [herramienta, setHerramienta] = useState(null);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchHerramienta = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/herramienta-baja?id=${id}`);
        if (response.data.length > 0) {
          setHerramienta(response.data[0]); 
        } else {
          throw new Error('No se encontró ninguna herramienta con ese ID');
        }
      } catch (err) {
        console.error('Error al obtener la herramienta:', err);
        setError(err.message);
      }
    };

    fetchHerramienta();
  }, [id]);

  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container className="mt-4">
      {herramienta ? (
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
                    src={`http://localhost:5000/uploads/${herramienta.imagen}`}
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
              <Card style={{ height: '80.5vh'}}>
                <Card.Body>
                  <h2 className="mb-4">{herramienta.tipo_nombre} #{herramienta.id}</h2>
                  <p><strong>Categoría:</strong> {herramienta.categoria_nombre}</p>
                  <p><strong>Subcategoría:</strong> {herramienta.subcategoria_nombre}</p>
                  <p><strong>Tipo:</strong> {herramienta.tipo_nombre}</p>
                  <p><strong>Observaciones:</strong> {herramienta.observaciones === "null" ? <em>[No hay observaciones]</em> : herramienta.observaciones}</p>
                </Card.Body>
              </Card>
              <div className='d-flex justify-content-end'>
                <Link to={`/ver`}>
                  <Button variant="secondary" className="me-2">Volver</Button>
                </Link>  
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <p>Cargando herramienta dada de baja...</p>
      )}
    </Container>
  );
}