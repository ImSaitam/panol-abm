import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../añadircategoriaboton.css';
import axios from 'axios';

export default function AñadirTipoBoton() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        className="add-button"
      >
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir tipo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Seleccione la categoría</Form.Label>
              <Form.Select>
 
              </Form.Select>
              <Form.Label>Seleccione la subcategoría</Form.Label>
              <Form.Select>
                <option value="Subcategoría 1">Subcategoría 1</option>
              </Form.Select>
              <Form.Label>Nombre de tipo</Form.Label>
              <Form.Control type="text" placeholder="Ingresa el nombre del tipo" />
            </Form.Group>
            <Button type='submit' variant="primary" onClick={handleClose}>
            Guardar
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
