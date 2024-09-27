import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import SidebarMenu from "./Sidebar";
import "../inicio.css";
import { useState } from "react";

export default function Inicio() {
    const [hovered, setHovered] = useState(null);

    const handleMouseEnter = (accordion) => {
        setHovered(accordion);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div className="inicio-container">
            <SidebarMenu />
            <div className="accordion-container">
                <Accordion 
                    activeKey={hovered === 1 ? "0" : ""}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >

                    <Accordion.Item eventKey="0">
                       
                        <Accordion.Header>Gestionar</Accordion.Header>

                        <Link to="/ver" className = "text-decoration-none">
                        <Accordion.Body>
                        Gestionar herramientas y consumibles
                        </Accordion.Body>
                        </Link>
                        <Link to="/gestion_categorias" className = "text-decoration-none">
                        <Accordion.Body>
                        Gestionar categoría, subcategoría y tipo
                        </Accordion.Body>
                        </Link>
                    </Accordion.Item>

                </Accordion>

                <Accordion 
                    activeKey={hovered === 2 ? "1" : ""}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Accordion.Item eventKey="1">

                        <Accordion.Header>Agregar </Accordion.Header>
                        <Link to ="/subir_herramientas" className = "text-decoration-none">
                        <Accordion.Body>
                           Agregar herramientas
                        </Accordion.Body>
                        </Link>
                        <Link to ="/subir_consumibles" className = "text-decoration-none">
                        <Accordion.Body>
                           Agregar consumibles
                        </Accordion.Body>
                        </Link>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}
