const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./databases/config');
require('dotenv').config();


const app = express();

//Base de datos
dbConnection();

//Cors
app.use( cors() );

//Directorio Publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//Rutas
// TODO: auth // crear user, login, renew del token
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: eventos
app.use('/api/events', require('./routes/events'));


//Escuchar peticion
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
})