import logo from './logo.svg';
import './css/App.css';

//importamos los componentes de React
import Navegacion from './Componentes/Navegacion';
import Footer from './Componentes/Footer/Footer';
import Formulario from './Componentes/Formulario';
import Imagenes from './Componentes/Imagenes';

function App() {
  return (
    <>
      <Navegacion />

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Formulario />

        <Imagenes />

      </div>

      <Footer />
    </>


  );
}

export default App;
