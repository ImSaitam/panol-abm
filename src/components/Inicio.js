import BarraNav from "./Navbar";
import { Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SidebarMenu from "./Sidebar";
import "../inicio.css";

export default function Inicio() {
    return (
        <>
        <SidebarMenu />
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Accordion>
            <Accordion.Item eventKey="0" className="w-25"> 
                <Accordion.Header>Gestionar</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus dapibus massa.</Accordion.Body>
            </Accordion.Item>
            </Accordion>
            <Accordion>
            <Accordion.Item eventKey="1" className="w-25 mt-5">
                    <Accordion.Header>Ver</Accordion.Header>
                    <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus dapibus massa.</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
        </>
    );
}