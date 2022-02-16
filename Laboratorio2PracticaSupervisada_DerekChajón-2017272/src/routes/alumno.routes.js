const express = require('express');
const alumnoControlador = require('../controllers/alumno.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarAlumno', alumnoControlador.Registrar);
api.post('/loginAlumno', alumnoControlador.Login);
api.put('/editarAlumno/:idAlumno', md_autenticacion.Auth,alumnoControlador.EditarPerfil);
api.delete('/eliminarAlumno/:idAlumno',md_autenticacion.Auth,alumnoControlador.EliminarPerfil)
api.put('/agregarCursoAlumno/:idAlumno', alumnoControlador.agregarCursos);

module.exports = api;