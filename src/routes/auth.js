/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
import { Router } from 'express';
// El {check} es un middleware que se va a encargar de validar un campo en particular, lo hace 1 a la vez.
import { check } from 'express-validator';
const router = Router();

import { crearUsuario, loginUsuario, renovarToken } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

// los [...] son una colección de middleware 
router.post(
    '/new', 
    [ //Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ], 
    crearUsuario
);

router.post(
    '/',
    [//Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);

router.get('/renew', [validarJWT], renovarToken);

module.exports = router;

