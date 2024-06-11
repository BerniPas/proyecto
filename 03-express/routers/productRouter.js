const { Router } =  require('express');
const router = Router();
const { check } = require('express-validator');
const { 
    productForm
} = require('../controllers/productControler.js');

/* 
    responde a /product
*/
router.get('/form', productForm);


module.exports = router;