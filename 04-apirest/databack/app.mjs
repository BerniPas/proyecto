

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { middleware } from './middleware/data.mjs';
import hbs from 'hbs';
import cors from 'cors';
import rutasUsuarios from './routers/userRouter.mjs';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = process.env.PORT || 9000;

app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials('./views/partials');

app.use(middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
/* app.use(cors({
    origin: process.env.URL_FRONT,
    methods: ["get", "post", "put", "delete"],
    credentials: true,
}
)); */ 
app.use(cors());
app.use(morgan('dev'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.PASS_MONGODB,
        }),
        cookie: {
            maxAge: 3600,
        }, 
    })
);

app.get('/', (req, res) => {

    const user = req.session.user;

    if (user) {
        res.json({ message: 'Usuario autenticado', user });
        console.log(user);
    } else {
        res.status(401).json({ message: 'Usuario no autenticado' });
    }

});


app.use('/user', rutasUsuarios);

export default app;

