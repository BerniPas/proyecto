import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';


function Imagenes() {

    const [usuario, setUsuario] = useState('Pepe');

    return (
        <Container>
            <h1>{usuario}</h1>
            <Row>
                <Col xs={6} md={4}>
                    <Image src="https://media.tycsports.com/files/2024/06/18/731427/alejandro-garnacho_862x485.webp" rounded />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://media.tycsports.com/files/2024/06/26/734586/argentina_862x485.webp?v=1" roundedCircle />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="https://media.tycsports.com/files/2024/06/23/733221/nicolas-otamendi_w862.webp" thumbnail />
                </Col>
            </Row>
        </Container>
    );
}

export default Imagenes;