
//ES6
import http from 'node:http';
//import { createServer } from 'node:http';

//1. export default
import pepe from './pepe.mjs';

import { pepes, pepess, pepessss } from './pepe.mjs';


//const server = createServer((req, res) => {
const server = http.createServer( (request, response) => {

    console.log(request);

    console.log(request.method);
    console.log(request.url);
    console.log(request.headers);
    console.log(request.body);

    const url = request.url;

    if (url === '/hello'){
        //response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(`<h1>Hola Gente</h1>`);
    }else{
        response.end(`<h1>404 Not Found</h1>`);
    }

    

    switch (url) {
        case '/hello':
            response.end(`<h1>Hola Gente</h1>`);
            break;
        case '/bye':
            response.end(`<h1>Adios Gente</h1>`);
            break;
        default:
            response.end(`<h1>404 Not Found</h1>`);
            break;
    }

});


// starts a simple http server locally on port 3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
