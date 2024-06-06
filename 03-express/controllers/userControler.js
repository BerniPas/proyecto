const { request, response } = require('express');
const { validationResult } = require('express-validator');


const userForm = (req = request, res = response) => {
    res.render('userForm');
}


const createUsers = (req = request, res = response) => {
    
    const result = validationResult(req);

    console.log(result.isEmpty());
    
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;

    console.log(req);

    const user = {  
        nombre,
        email,
        password
    }

    console.log(user);
    
    res.json({
        respuesta: user
    });

}


const getUserAll = (req = request, res = response) => {
    res.json({
        respuesta: 'Bienvenido a la creación de usuarios'
    });
}


module.exports = {
    userForm,
    createUsers,
    getUserAll
};