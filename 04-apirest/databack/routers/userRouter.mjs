import { Router } from 'express';

import{
    getUsers,
    getForm,
    createUser,
    userLogin,
    userLogout,
    updateUser,
    deleteUser
} from '../controllers/userControler.mjs'

const router = Router();

/* 
    responder a la ruta user
 */

router.get('/all', getUsers);
router.get('/form', getForm);
router.post('/', createUser);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.put('/edit/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);


export default router;