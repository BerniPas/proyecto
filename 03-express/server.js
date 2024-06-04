//2.Otra configuracion 
require('dotenv').config();
const PORT = process.env.PORT_SERVER || 9000;
const app = require('./index');

//1. Levantar la conexión 
const conexion = require('./models/conexion');
conexion();

//2. Escuchar el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});