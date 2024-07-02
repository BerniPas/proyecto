import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        const URL_BACK = import.meta.env.VITE_URL_BACK_LOGIN;

        console.log(URL_BACK);

        console.log(email, password);

        try {
            const response = await axios.post(URL_BACK,
                {
                    email,
                    password,
                },
            );

            if (response.status === 200) {
                
                //await login(response.data.user);
                console.log(response)
                console.log('Inicio de sesión exitoso');
                console.log(response.data.token);
                localStorage.setItem("token", response.data.token); 
                document.cookie = `token=${response.data.token}`;
                navigate('/admin');
            }
        } catch (error) {

            setError("Las credenciales son incorrectas");
            console.error('Error en la solicitud de inicio de sesión', error);

        }
    };

    return (
        <>
        <h1 className="text-center mt-5 mb-5">
            Form Login
        </h1>
        
        <div className="container"> 
                <Form className='w-75' onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="nombre">
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
                    </Form.Group>
                    {error && <div className="login-error-message">{error}</div>}
                    <div className="login-button-container">
                    <button type="submit" className="btn btn-success w-50">Login</button>
                    </div>
                </Form>
                </div>

</>
    );
}

export default Login;