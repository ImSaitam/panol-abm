import BarraNav from "./Navbar";
import { Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Inicio() {
    return (
        <>
        <BarraNav />
        <Accordion>
            <Accordion.Item eventKey="0" className="w-25"> 
                <Accordion.Header>Gestionar</Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="w-25 mt-5">
                <Accordion.Header>Ver</Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </>
    );
}