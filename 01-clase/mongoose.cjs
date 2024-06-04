
const mongoose = require('mongoose');


//función asyncrona
const conexion = mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Conexión exitosa'))
    .catch(err => console.log(err));



const conexionUno = mongoose.connect('mongodb://localhost:27017/test');

//1. export con ES5
module.exports = conexion;

//2. export desestructurado
module.exports = { 
    conexion, 
    conexionUno 
};
