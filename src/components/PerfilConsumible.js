import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PerfilConsumible() {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const handleDeactivate = () => {
    alert('Herramienta dada de baja.')
    handleClose()
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="bg-success" style={{ aspectRatio: '1 / 1' }}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <h2 className="text-white">FOTO</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ height: '80.5vh'}}>
            <Card.Body>
              <h2 className="mb-4">Nombre #(N°de id)</h2>
              <p><strong>Categoría:</strong> [Categoría de la herramienta]</p>
              <p><strong>Subcategoría:</strong> [Subcategoría de la herramienta]</p>
              <p><strong>Tipo:</strong> [Tipo de herramienta]</p>
              <p><strong>Unidad: </strong> [Unidad]</p>
              <p><strong>Cantidad: </strong> [cantidad]</p>
            </Card.Body>
          </Card>
          <div className='d-flex justify-content-end'>
            <Link to="/modificar"><Button variant="primary" className="me-2">Modificar</Button></Link>
            <Button variant="danger" onClick={handleShow}>Dar de baja</Button>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dar de baja herramienta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea dar de baja la herramienta [Nombre de herramienta] #(N° de ID)?
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
    </Container>
  )
}