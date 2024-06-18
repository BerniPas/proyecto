const { request, response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const enviaMail = require('../servicios/envioMail.js');


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

        //encriptamos la contraseña
        //1. generamos la sal
        const salt = await bcrypt.genSalt(10);
        console.log(salt);

        //2. encriptamos la contraseña + sal
        newUser.password = await bcrypt.hash(newUser.password, salt);
        console.log(newUser.password);

        //guardamos el user nuevo
        await newUser.save();
        //db.user.insertOne(newUser); //sería la forma de hacerlo en mongoDB
        //const sql = `INSERT INTO users (nombre, email, password) VALUES ('${nombre}', '${email}', '${password}')`;
        //const query = await db.query(sql);

        //Enviamos un email al usuario registrado con un mensaje de bienvenida
        await enviaMail(newUser.email, newUser.nombre);
        
        return res.render('userForm',{
            mensaje: 'Usuario creado',
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
        
        return res.render('listarUsuarios',{
            users
        });

    } catch (error) {
        return res.status(500).render('error', {
            message: 'Error al obtener los usuarios',
        });
    }



}


const formLogin = (req = request, res = response) => {
    
    res.render('userLogin');
}


const userLogin = async (req = request, res = response) => {

    
    const result = validationResult(req);
    const { email, password } = req.body;
    
    if(!result.isEmpty()){
        console.log(result.array());
        
        return res.render('error', {
            message: 'Faltan datos que son obligatorios'
        });
            
    }

    try {
        const userExists = await User.findOne({email: email});

        if(!userExists){
            return res.render('error', {
                message: 'El usuario NO existe en la Database'
            });
        }

        //comparamos la contraseña con el método compare de bcrypt
        const match = await bcrypt.compare(password, userExists.password);

        if(!match){
            return res.render('error', {
                message: 'User o Password incorrectos'
            });
        }

        //jwt
        //session

        return res.status(200).render('admin');

    } catch (error) {
        return res.status(500).render('error', {
            message: 'Estamos solucionado un problema en la database'
        });
    }
    
            
}


module.exports = {
    userForm,
    createUsers,
    getUserAll,
    formLogin,
    userLogin
};