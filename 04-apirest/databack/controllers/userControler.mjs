import { request, response } from 'express';
import User from '../database/userModel.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUsers = async (req = request, res = response) => {

    const usuarios = await User.find({});

    res.json({
        user: usuarios
    });

}

const createUser = async (req = request, res = response) => {

    const { nombre, email, password } = req.body;

    console.log(req.body);

    const user = {
        nombre: nombre,
        email: email,
        password: password
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
        return res.status(409).json({
            error: "Usuario ya existe"
        });
    }


    try {

        //creamos una sal para la encriptación
        const salt = await bcrypt.genSalt(10);
        console.log(salt);

        //encriptamos la contraseña
        user.password = await bcrypt.hash(user.password, salt);

        console.log(user.password);

        const newUser = new User(user);

        await newUser.save();

        return res.json({
            user: "Usuario Creado"
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: "Error en el sitema"
        });
    }

}

const userLogin = async (req, res) => {

    const { email, password } = req.body;
    console.log(email, password);

    const isValidCredentials = async (user) => {

        try {
            const userFound = await User.findOne({ email: user.email });

            if (!userFound) {
                return { ok: false, message: 'Usuario no encontrado' };
            }

            const isMatch = await bcrypt.compare(user.password, userFound.password);

            if (!isMatch) {
                return { ok: false, message: 'Contraseña incorrecta' };
            }

            return { ok: true, userFound };

        } catch (error) {

            console.error(error);
            return { ok: false, message: 'Error en la autenticación' };
        }

    };

    try {
        const { email, password } = req.body;

        const validation = await isValidCredentials({ email, password });


        if (validation.ok) {
            const user = validation.userFound;
            const payload = { user: { _id: user.id } };

            const token = jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 });

            console.log(token)

            req.session.user = {
                _id: user._id,
                usernombre: user.nombre,
                email: user.email,
                token: token,
            };

            await req.session.save();

            console.log(`Usuario autenticado: ${user.nombre}`);

            res.status(200).json({ message: 'Acceso al sistema exitoso', user, token });

        } else {

            res.status(401).json({ message: validation.message });
        }
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


const userLogout = async (req, res = response) => {

    try {

        await res.clearCookie('token');
        await req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.status(500).json({ message: 'Error al cerrar sesión' });
            } else {
                res.status(200).json({ message: 'Cierre de sesión exitoso' });
            }
        });

    } catch (error) {

        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};

const getForm = (req = request, res = response) => {
    res.render('formulario');

}


const updateUser = async (req, res) => {

    const userId = req.params.userId;
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        };

        let newPasswordHash = existingUser.password;

        if (password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            newPasswordHash = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username,
                password: newPasswordHash,
                email
            },
            { new: true }
        );

        if (updatedUser) {
            res.json({ success: true, user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};


const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser) {
            res.json({ success: true, message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor al eliminar usuario' });
    }
};



export {
    getUsers,
    getForm,
    createUser,
    userLogin,
    userLogout,
    updateUser,
    deleteUser
}

