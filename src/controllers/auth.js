import {response} from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import { generarJWT } from '../helpers/jwt';

export const crearUsuario = async (req, res = response) => {

   const { email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario existe con ese correo'
            })
        }
        
        usuario = new Usuario( req.body )

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        
        res.status(201).json({
            ok: true,
            msg: 'Creación de un nuevo user',
            uid: usuario.id, 
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            
            msg: 'Por Favor hable con el Admin'
        })        
    }
    
}

export const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            
            msg: 'Por Favor hable con el administrador'
        })   
    }

}

export const renovarToken = async(req, res = response) => {

    const { uid, name } = req;

    //Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}

//Sin @babel, tocaria exportar de la sig forma: 
/*
module.exports = {
    crearUsuario,
    ...
}
*/