import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../añadircategoriaboton.css";
import axios from "axios";
import { config } from "./config";

export default function AñadirSubCategoriaBoton() {
  const [show, setShow] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${config}/subcategoria`,
        { ...formData, categoria_id: selectedCategoryId },
        {
          "Content-Type": "application/json",
        }
      );
    } catch (error) {
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${config}/categorias`);
        setCategorias(response.data);
      } catch (error) {
      }
    };

    fetchCategorias();
  }, []);

  return (
    <>
      <Button variant="secondary" onClick={handleShow} className="add-button">
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir subcategoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Select
                onChange={(event) => {
                  setSelectedCategoryId(event.target.value);
                  setFormData({ ...formData, categoriaId: event.target.value });
                }}
              >
                <option value="">Seleccione la categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </Form.Select>
              <Form.Label>Nombre de subcategoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre de la subcategoría"
                onChange={(event) =>
                  setFormData({ ...formData, nombre: event.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary" onClick={handleClose}>
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
