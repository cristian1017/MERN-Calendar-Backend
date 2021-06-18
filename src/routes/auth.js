/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
// El {check} es un middleware que se va a encargar de validar un campo en particular, lo hace 1 a la vez.
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


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

