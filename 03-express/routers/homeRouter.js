
const { Router } =  require('express');
const router = Router();
const homeControler = require('../controllers/homeControler.js');

/* 
    responde a /home
*/
router.get('/', homeControler);

module.exports = router;

