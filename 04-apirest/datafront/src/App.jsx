import { Routes, Route } from 'react-router-dom' 
import Navegacion from './componentes/Navegacion'
import Home from './componentes/Home'
import Login from './componentes/Login'
import Formulario from './componentes/Formulario'
import Api from './componentes/Api'
import Sucursales from './componentes/Sucursales'
import Error from './componentes/Error'
import Usuarios from './componentes/Usuarios'
import Admin from './componentes/Admin'
import Layout from './componentes/Layout'


function App() {

  return (
    <>

    <Layout />
      <Navegacion />
    <Layout />

    <Routes>
      <Route path='/' element= {<Home />}/>
      <Route path='/login' element= {<Login />} />
      <Route path= '/formulario' element= {<Formulario />} />
      <Route path='/usuarios' element= {<Usuarios />} />
      <Route path='/api' element= {<Api />} />
      <Route path='/admin' element= {<Admin />} />
      <Route path='/sucursales' element= {<Sucursales />} />
      <Route path='/*' element= {<Error />} />
    </Routes>

    </>
  )
}

export default App
