import { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';

function Usuarios() {
  const [count, setCount] = useState(0);
  const [usuarios, setUsuarios] = useState([]);

  const URL_BACKEND_GET = import.meta.env.VITE_URL_BACK_GET;
  const URL_BACKEND_POST = import.meta.env.VITE_URL_BACK_POST;

  //delete users with axios
const deleteUser = async (userId) => {

  const admin = localStorage.getItem('token');

  const cookies = new Cookies();
  const cookie = cookies.get('token');

  console.log(cookie);


  if (!admin) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes permisos para eliminar usuarios',
    });
    return;
  }else{
    try {

/*       const confirm = window.confirm('¿Estás seguro de ELIMINAR este usuario?');

      if (confirm === false) {
        return;
      } */

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
          if (result.isConfirmed) {
            const response = await axios.delete(`${URL_BACKEND_POST}/delete/${userId}`);
            console.log(response);
            await obtenerUsuarios();  
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });

/*       console.log(userId);

      const response = await axios.delete(`${URL_BACKEND_POST}/delete/${userId}`);
      console.log(response);  */

      /* obtenerUsuarios();  */

    } catch (error) {
      console.log(error);
    }

  }
}


  const updateUser = async (user) => {

    const confirm = window.confirm('¿Estás seguro de ACTUALIZAR este usuario?');

    try {

      if (confirm === false) {
        return;
      }

      console.log(user);

      /* const response = await axios.delete(`${URL_BACKEND_POST}/update/${userId}`);
      console.log(response);  */
    } catch (error) {
      console.log(error);
    }
    
  }


const obtenerUsuarios = async () => {
  try {
    //Ver respuestas en la consola
    //const respuesta = await axios.get(URL_BACKEND);
    //console.log(respuesta);
    const { data } = await axios.get(URL_BACKEND_GET)
    setUsuarios(data.user);
    console.log(data.user);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  obtenerUsuarios();
}, []);

return (
  <>
    <h1 className="text-center mt-5 mb-5">
      Tabla de Usuarios
    </h1>

    <Table striped bordered hover responsive>
      <thead className='text-center'>
        <tr>
          <th>#Id</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Contraseña</th>
          <th colSpan={2}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>
              {user.nombre}
            </td>
            <td>
              {user.email}
            </td>
            <td>
              {user.password}
            </td>
            <td>
              <Button variant='danger' onClick={() => deleteUser(user._id)}>Borrar</Button>
            </td>
            <td>
              <Button variant='warning' onClick={() => updateUser(user)}>Editar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <div className="text-center mt-5 mb-5">
      <Link to="/formulario">
        <Button variant="success w-50">Agregar Usuario</Button>
      </Link>
    </div>


    <div className='text-center mt-5 mb-5'>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Vite + React</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, nihil. Blanditiis illum nemo amet sunt eaque? Reiciendis consequatur architecto nam? Nostrum eum natus atque dolorum repellat reiciendis possimus soluta vero.
        Lorem ipsum dolor sit amet, consectetur <Link to='/formulario'>Formulario</Link>  elit. Ea repellendus eius maiores est dolorem sapiente ullam libero, ad optio tempora nisi repudiandae, porro vero amet consequuntur sunt molestias, repellat assumenda!
      </p>
    </div>
  </>
);
}

export default Usuarios;