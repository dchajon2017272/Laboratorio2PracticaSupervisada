const express = require('express');
const cursoControlador = require('../controllers/curso.controller');

const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();
api.post('/agregarCurso', md_autenticacion.Auth, cursoControlador.agregarCurso);
api.get('/obtenerCursos', md_autenticacion.Auth, cursoControlador.obtenerCursos);
api.get('/obtenerCursosId/:idCurso', md_autenticacion.Auth, cursoControlador.ObtenerCursosId);
api.put('/editarCurso/:idCurso', md_autenticacion.Auth,cursoControlador.EditarCurso);
api.delete('/eliminarCurso/:idCurso',md_autenticacion.Auth,cursoControlador.EliminarCurso);
/*api.put('/agregarRespuesta/:idEncuesta', md_autenticacion.Auth, encuestaControlador.agregarRespuestaEncuesta);
api.put('/editarRespuesta/:idRespuesta', md_autenticacion.Auth, encuestaControlador.editarRespuestaEncuesta);
api.get('/obtenerEncuestasUsuario', md_autenticacion.Auth, encuestaControlador.obtenerEncuestasUsuario);*/

module.exports = api;