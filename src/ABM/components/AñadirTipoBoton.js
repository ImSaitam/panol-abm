import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../añadircategoriaboton.css";
import axios from "axios";
import { config } from "./config";

export default function AñadirTipoBoton() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [subcategorias, setSubcategorias] = useState([]);
  const [filteredSubcategorias, setFilteredSubcategorias] = useState([]);

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

  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (selectedCategoryId) {
        try {
          const response = await axios.get(
            `${config}/subcategorias`
          );
          setSubcategorias(response.data);
          setFilteredSubcategorias(
            response.data.filter(
              (subcategoria) =>
                subcategoria.categoria_id === parseInt(selectedCategoryId)
            )
          );
        } catch (error) {
        }
      } else {
        setFilteredSubcategorias([]);
      }
    };

    fetchSubcategorias();
  }, [selectedCategoryId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${config}/tipo-herramienta`,
        {
          ...formData,
          categoria_id: selectedCategoryId,
          subcategoria_id: selectedSubcategoryId,
        },
        {
          "Content-Type": "application/json",
        }
      );
      window.location.reload();
    } catch (error) {
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow} className="add-button">
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir tipo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Seleccione la categoría</Form.Label>
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
              <Form.Label>Seleccione la subcategoría</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setSelectedSubcategoryId(event.target.value);
                  setFormData({
                    ...formData,
                    subcategoriaId: event.target.value,
                  });
                }}
              >
                <option value="">Seleccione la subcategoría</option>
                {filteredSubcategorias.map((subcategoria) => (
                  <option key={subcategoria.id} value={subcategoria.id}>
                    {subcategoria.nombre}
                  </option>
                ))}
              </Form.Select>
              <Form.Label>Nombre de tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del tipo"
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
