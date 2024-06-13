const { Router } =  require('express');
const router = Router();
const { check } = require('express-validator');
const { 
    userForm,
    getUserAll,
    createUsers, 
    formLogin,
    userLogin
} = require('../controllers/userControler.js');

/* 
    responde a /user
*/

router.get('/formulario', userForm);
router.get('/all', getUserAll);
router.get('/login', formLogin);

router.post('/', 
    [
        check('nombre', "Nombre obligatorio").not().isEmpty().isLength({min: 3}),
        check('email').not().isEmpty().isEmail(),
        check('password').not().isEmpty().isLength({min: 6})
    ], createUsers);

router.post('/login',
    [
        check('email').not().isEmpty().isEmail(),
        check('password').not().isEmpty().isLength({min: 6})
    ] , userLogin);

module.exports = router;