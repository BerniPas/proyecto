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
    check('nombre').notEmpty().isLength({min: 3}),
    check('email').isEmail(),
    check('password').notEmpty().isLength({min: 6})
], 
createUsers);

module.exports = router;