const { Router } =  require('express');
const router = Router();
const { check } = require('express-validator');
const { 
    userForm,
    getUserAll,
    createUsers, 
} = require('../controllers/userControler.js');

/* 
    responde a /user
*/

router.get('/formulario', userForm);
router.get('/all', getUserAll);

router.post('/', 
[
    check('nombre', "Nombre obligatorio").not().isEmpty().isLength({min: 3}),
    check('email').not().isEmpty().isEmail(),
    check('password').not().isEmpty().isLength({min: 6})
], 
createUsers);

module.exports = router;