const express = require('express');
const hbs = require('hbs');
const path = require('node:path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const { middlewares } = require('./middlewares/data.js');
const homeRouter = require('./routers/homeRouter.js');

//configuraciones de motores de plantillas
app.set('view engine', 'hbs');
//seteamos la ruta de las vistas
app.set('views', path.join(__dirname, 'views'));
//seteamos la ruta de los parciales
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use( middlewares );
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors(/* {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
} */));

//app.use('/home', require('./routers/homeRouter'));
app.use('/home', homeRouter);

app.get('/hbs', (req, res) => { //http://localhost:8080/hbs
    res.render('index');
}); 

app.get('/usuario', (req, res) => {//http://localhost:8080/usuario
    res.render('usuario');
});





module.exports = app;