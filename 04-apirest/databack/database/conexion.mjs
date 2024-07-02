import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.PASS_MONGODB;

const conexion = mongoose.connect(URI).then(
    () => {
        console.log('Conectado a la base de datos');
    },
    err => {
        console.log('Error al conectar a la base de datos');
        console.log(err);
    }
);

export default conexion;