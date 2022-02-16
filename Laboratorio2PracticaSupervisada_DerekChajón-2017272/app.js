// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const MaestroRutas =require('./src/routes/maestro.routes');
const AlumnoRutas =require('./src/routes/alumno.routes');
const CursoRutas =require('./src/routes/curso.routes');



// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api', MaestroRutas, AlumnoRutas,CursoRutas);


module.exports = app;