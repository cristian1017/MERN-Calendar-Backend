import {Router} from 'express';
import { check } from 'express-validator';
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from '../controllers/events';
import { isDate } from '../helpers/isDate';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
const router = Router();

//Todas tienen qeu pasar por la validación del token
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

//Actulizar Evento
router.put(
    '/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatorio').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);

//Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
