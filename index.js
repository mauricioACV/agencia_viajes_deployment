//Configuracion nueva
import express from 'express';
//importando router desde routes
import router from './routes/index.js'
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path: "variables.env"});

//Configuracion con la sintaxis de common JS (version antigua)
// const express = require('express');
//Configuracion con la sintaxis de common JS (version antigua)

const app = express();

//conectar base de datos
db.authenticate()
    .then(() => console.log('Bade de datos conectada'))
    .catch( error => console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});

//Habilitar PUG
app.set('view engine', 'pug');

//obtener año actual
app.use((request, response, next) => {
    const year = new Date();
    response.locals.actualYear = year.getFullYear();
    response.locals.nombresitio = "Agencia de Viajes";
    next();
});

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

//Todo el siguiente codigo se movio a routes ya que si tenemos muchas paginas el archivo crece mucho
// app.get('/', (request, resolve) => {
    
//     resolve.send('Inicio')
    
//     // resolve.json({
//     //     id: 1
//     // })

//     // resolve.render();
// })

// app.get('/nosotros', (request, resolve) => {
    
//     resolve.send('Nosotros')
// })

// app.get('/contacto', (request, resolve) => {
    
//     resolve.send('Contacto')
// })