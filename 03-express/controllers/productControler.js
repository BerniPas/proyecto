const { request, response } = require('express');
const { validationResult } = require('express-validator');

const productForm = (req = request, res = response) => {

    res.render('productForm');
    
};

const createProduct = async (req = request, res = response) => {

    const { nombre, precio, imagen, stock } = req.body;

    const result = validationResult(req);

    if(!result.isEmpty()){
        console.log(result.array());

        return res.render('error', {
            message: 'Faltan datos que son obligatorios'
        });

    }

    const producto = {
        nombre: nombre,
        precio: req.body.precio,
        imagen: req.body.imagen,
        stock: req.body.stock
    };

    console.log(producto);

    res.json({
        producto
    });
}


module.exports = {
    productForm,
    createProduct
}