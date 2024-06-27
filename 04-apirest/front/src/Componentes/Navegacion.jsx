import React from 'react';
import { useState } from 'react';
/* JSX */

function Navegacion() {

    const [usuario, setUsuario] = useState('Pepe');

    return(
        <React.Fragment>
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="/usuario">{usuario}</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/user/formulario">Form Users</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/product/form">Form Products</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/user/all">Usuarios</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/product/all">Productos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/user/login">Login</a>
                                    </li>
                                </ul>
                                <form class="d-flex" action="/user/logout" method="post">
                                    <button class="btn btn-outline-danger" type="submit">
                                        Cerrar Session
                                    </button>
                                </form>
                            </div>
                        </div>
                </nav>

                <form class="d-flex" action="/user/logout" method="post">
                <button class="btn btn-outline-danger" type="submit">
                    Cerrar Session
                </button>
                </form>
            </>
        </React.Fragment>
    )
}

export default Navegacion;


