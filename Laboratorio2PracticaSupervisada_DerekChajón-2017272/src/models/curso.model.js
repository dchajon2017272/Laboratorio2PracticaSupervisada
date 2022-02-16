const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = Schema({
    nombre: String,
    descripcion: String,
   /* alumnos: [{
        textoRespuesta: String,
        idAlumnoCurso: { type: Schema.Types.ObjectId, ref: 'Alumnos' }
    }],
    idCursosConAlumnos: { type: Schema.Types.ObjectId, ref: 'Alumnos'}*/
});

module.exports = mongoose.model('Cursos', CursoSchema);