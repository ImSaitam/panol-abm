import React, { useState } from "react";
import { Offcanvas, Button, ListGroup, Accordion } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../sidebar.css";

function SidebarMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Menú lateral */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>ABM</Accordion.Header>
                <Accordion.Body>
                  <Link to="" className="text-decoration-none"><ListGroup.Item className="hover-color">Crear categoría</ListGroup.Item></Link>
                  <Link to="" className="text-decoration-none"><ListGroup.Item className="hover-color">Crear subcategoría</ListGroup.Item></Link>
                  <Link to="" className="text-decoration-none"><ListGroup.Item className="hover-color">Crear tipo de herramienta</ListGroup.Item></Link>
                  <hr />
                  <Link to="" className="text-decoration-none"><ListGroup.Item className="hover-color">Alta de herramientas</ListGroup.Item></Link>
                  <Link to="" className="text-decoration-none"><ListGroup.Item className="hover-color">Ver herramientas</ListGroup.Item></Link>
                  <hr />
                  <Link to="" className="text-decoration-none"><ListGroup.Item className="hover-color">Alta de consumibles</ListGroup.Item></Link>
                  <Link to="" className="text-decoration-none"><ListGroup.Item className="hover-color">Modificar consumibles</ListGroup.Item></Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Pedidos</Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>


    </>
  );
}

export default SidebarMenu;
