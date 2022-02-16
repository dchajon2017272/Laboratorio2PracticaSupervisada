const express = require('express');
const maestroControlador = require('../controllers/maestro.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarMaestro', maestroControlador.Registrar);
api.post('/loginMaestro', maestroControlador.Login);
//api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, usuarioControlador.EditarUsuario);

module.exports = api;