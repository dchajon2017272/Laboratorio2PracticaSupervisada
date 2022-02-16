const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaestroSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    usuario: String,
    password: String,
    rol: String
    //cursos: String
});

module.exports = mongoose.model('Maestros', MaestroSchema);