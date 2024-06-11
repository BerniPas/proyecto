const { request, response } = require('express');

const productForm = (req = request, res = response) => {

    res.render('productForm');
    
};


module.exports = {
    productForm
}