
//ES5: common javascript => .cjs

//ES6: EcmaScript 6 => .mjs (module javascript)

console.log('Hola mundo');

//servidor con Node Nativo

//ES
//const http = require('node:http');
const { createServer } = require('node:http');

//importamos la conexión a la base de datos
const conexion = require('./mongoose.cjs');

//const server = http.createServer((req, res) => {
const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});



server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});





