import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Formulario() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const URL_BACK = import.meta.env.VITE_URL_BACK_POST;

    const navigate = useNavigate();


    const imprimirDatos = () =>{

        console.log(`Datos ingresados en el formulario. ${nombre} - ${email} - ${password}`)
        
        alert(`Datos ingresados en el formulario: ${nombre} - ${email} - ${password}`);
        
        limpiarDatos();
        
    }
    
    function limpiarDatos() {
        setNombre('');
        setEmail('');
        setPassword('');
    }
    
    const crearUsuario = async (e) => {
        
        console.log(e);

        console.log(e.target);

        //Captura de datos en JS nativo
        //const nombre = document.getElementById('nombre').value;

        e.preventDefault();

            await axios.post(URL_BACK, { nombre, email, password })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                navigate('/*');
            });

        limpiarDatos();

    }

    return ( 
        <>
        <h1 className="text-center mt-5 mb-5">
            Form de Carga de Usuarios
        </h1>

        <div className="container">
            <Form className='w-75' onSubmit={crearUsuario}>
            <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre: </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="name"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}                     
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="name@example.com" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <div className="mb-3 text-center">
                        <button onClick={ imprimirDatos } type="button" className="btn btn-success w-50">Imprimir Usuarios</button>
                        <button type="submit" className="btn btn-success w-50">Crear Usuarios en DB</button>
                    </div>
                    <div className="mb-3 text-center">
                        <button onClick={ limpiarDatos } className="btn btn-danger w-75">Reset</button>
                    </div>
            </Form>
        </div>

    </>
    );
}

export default Formulario;