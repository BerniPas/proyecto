const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//datos para enviar el correo
const GMAIL_USER = process.env.GMAIL_USER

//1. Habilitar la configuración de autenticación de dos pasos en google
//2. Crear una contraseña de aplicación
const GMAIL_PASS = process.env.GMAIL_PASS


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
    },
});

// async..await is not allowed in global scope, must use a wrapper
const enviaMail = async (email, nombre) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Mi Empresa X 👻" <bernalpas@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔ desde Mi Empresa X", // Subject line
        html: `<b>Hola ${nombre}</b>
        <p>Gracias por registrarte en nuestra Empresa y podés acceder a más compres en esta dirección 
        <a href="https://sceu.frba.utn.edu.ar/e-learning/" target="_blank">Comprar Más</a></p>`, // html body
    });

}

module.exports = enviaMail;