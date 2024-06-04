const { request, response } = require('express');

const homeControler = (req = request, res = response) => {
    res.status(200).send('Hello World');

}


module.exports = homeControler;