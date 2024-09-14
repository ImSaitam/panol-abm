import { Accordion } from "react-bootstrap";
import SidebarMenu from "./Sidebar";
import "../inicio.css";

export default function Inicio() {
    return (
        <>
        <SidebarMenu />
            <Accordion>
            <Accordion.Item eventKey="0" className="w-25"> 
                <Accordion.Header>Gestionar</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus dapibus massa.</Accordion.Body>
            </Accordion.Item>
            </Accordion>
            <Accordion>
                <Accordion>
            <Accordion.Item eventKey="1" className="w-25">
                    <Accordion.Header>Ver</Accordion.Header>
                    <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus dapibus massa.</Accordion.Body>
                </Accordion.Item>
                </Accordion>
            </Accordion>
        </>
    );
}