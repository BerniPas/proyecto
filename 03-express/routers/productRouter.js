const { Router } =  require('express');
const router = Router();
const { check } = require('express-validator');
const { 
    productForm,
    createProduct
} = require('../controllers/productControler.js');

/* 
    responde a /product
*/
router.get('/form', productForm);
router.post('/', 
    [
        check('nombre', "Nombre obligatorio").not().isEmpty().isLength({min: 3}),
        check('precio').not().isEmpty().isNumeric(),
        check('imagen').not().isEmpty(),
        check('stock').not().isEmpty().isNumeric()
    ], createProduct);


module.exports = router;