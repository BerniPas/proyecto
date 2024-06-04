

const middlewares = (req, res, next) => {
    console.log('Middleware');
    next();
};

const middlewaresUno = (req, res, next) => {
    console.log('Middleware');
    next();
};

const middlewaresDos = (req, res, next) => {
    console.log('Middleware');
    next();
};

module.exports = { 
    middlewares,
    middlewaresUno,
    middlewaresDos
};
