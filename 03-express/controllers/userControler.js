const { request, response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user.js');


const userForm = (req = request, res = response) => {
    res.render('userForm');
}


const createUsers = async (req = request, res = response) => {
    
    const result = validationResult(req);

    //console.log(result.isEmpty());
    //console.log(req);

    //verificamos si hay errores con la validación de express-validator
    if(!result.isEmpty()){
        console.log(result.array());

        return res.render('error', {
            message: 'Faltan datos que son obligatorios'
        });

    }
    
    //opción 1 de captura de datos 
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    
    
    //opción 2 de captura de datos 
    const user = {  
        nombre,
        email,
        password
        }
    
    //opción 3 de captura de datos 
    //const { nombre, email, password } = req.body;
        
    console.log(user);

    try {
        //buscamos en la base de datos si el usuario ya existe
        const userExists = await User.findOne({email: email});

        console.log(userExists);

        if(userExists){
            return res.render('error', {
                message: 'El usuario ya existe'
            });
        }

        //creamos el usuario
        //const newUser = new User(nombre, email, password);
        const newUser = new User(user);

        //guardamos el user nuevo
        await newUser.save();
        
        return res.json({
            newUser
        });

    } catch (error) {
        console.log(error);
        return res.render('error', {
            message: 'Error en la database'
        });
    }
    
    

}


const getUserAll = async (req = request, res = response) => {

    try {

        const users = await User.find({});

        console.log(users);
        
        return res.json({
            users
        });

    } catch (error) {
        return res.status(500).render('error', {
            message: 'Error al obtener los usuarios',
        });
    }



}


module.exports = {
    userForm,
    createUsers,
    getUserAll
};