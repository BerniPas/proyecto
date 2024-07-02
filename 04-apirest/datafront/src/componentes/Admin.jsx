import { useNavigate } from "react-router-dom";
/* import { useState } from "react"; */
import { Button } from "react-bootstrap";
import axios from "axios";

const Admin = () => {

    /* const [usuario, setUsuario] = useState('')  */

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            const URL_BACK = import.meta.env.VITE_URL_BACK_POST;

            const response = await axios.post(
                `${URL_BACK}/logout`,
                {
                    withCredentials: true,
                }  
            );

            if (response.status === 200) {
                await localStorage.removeItem("token");
                console.log('Cierre de sesión exitoso');
                navigate('/login');
            } else {
                console.error('Error en el cierre de sesión:', response.status);

                if (response.status === 401) {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Error en la solicitud de cierre de sesión', error);
        }
    };


    return (
        <>
            <h1 className="text-center mt-5 mb-5">
                Bienvenido Administrador {/* {usuario} */}
            </h1>

            <div className="text-center">
                {/* <p className='session-name'>Hola, {user.nombre}</p> */}
                <Button className='session-button w-50' variant="light" size="sm" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </div>

            <div className="text-center mt-5 mb-5">
                <img
                    src="https://rincondeladministrador.com/wp-content/uploads/2018/04/manager.jpg"
                    alt="error en el login"
                />
            </div>
        </>
    )
}

export default Admin;