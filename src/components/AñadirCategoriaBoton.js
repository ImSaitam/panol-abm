import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../añadircategoriaboton.css";
import axios from "axios";

export default function AñadirCategoriaBoton() {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/categoria", formData, {
        'Content-Type': 'application/json'
      }
      );
    } catch (error) {
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} className="add-button">
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Nombre de Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre de la categoría"
                onChange={(event) =>
                  setFormData({ ...formData, nombre: event.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" onClick={handleClose}>
                Guardar
              </Button>
            </div>
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
