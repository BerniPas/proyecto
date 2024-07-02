
const middleware = (req, res, next) => {

    console.log(req.url);
    console.log(req.method);
    console.log(req.body);
    console.log('================================');
    console.log('Middleware');
    console.log('================================');

    next();
}

export { 
    middleware
};