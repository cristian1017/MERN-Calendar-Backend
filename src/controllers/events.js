import {response} from 'express';
import Evento from '../models/Evento';

export const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    });
}

export const crearEvento = async(req, res = response) => {
    
    //Verificar que tenga el evento
    //console.log(req.body)

    const evento = new Evento( req.body );
    
    try {

        evento.user = req.uid;
        console.log(req.uid)
        console.log(req.name)


        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            msg: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

export const actualizarEvento = async(req, res = response) => {

    const eventoId= req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} ); 

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


export const eliminarEvento = async(req, res = response) => {

    const eventoId= req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            })
        }

       await Evento.findByIdAndDelete( eventoId ); 

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}




