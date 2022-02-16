const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AlumnoSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    usuario: String,
    password: String,
    rol: String,
    cursos: [{
        cursoNombre: String,
        idCursoAlumno: { type: Schema.Types.ObjectId, ref: 'Cursos' }
    }],
    //cursos: String
});

module.exports = mongoose.model('Alumnos', AlumnoSchema);