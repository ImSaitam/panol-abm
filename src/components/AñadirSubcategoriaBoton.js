import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../añadircategoriaboton.css';  // Importa el archivo CSS

export default function AñadirSubCategoriaBoton() {
  const [show, setShow] = useState(false);

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
          <Modal.Title>Añadir subcaategoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Seleccione la categoría</Form.Label>
              <Form.Select>
                <option value="Categoría 1">Categoría 1</option>
              </Form.Select>
              <Form.Label>Nombre de subcategoría</Form.Label>
              <Form.Control type="text" placeholder="Ingresa el nombre de la subcategoría" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
