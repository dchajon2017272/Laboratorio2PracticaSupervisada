const Curso = require('../models/curso.model');


function agregarCurso(req, res){
    var parametros = req.body;
    var cursoModel = new Curso();

    if(parametros.nombre && parametros.descripcion){
        cursoModel.nombre = parametros.nombre;
        cursoModel.descripcion = parametros.descripcion;
        //cursoModel.idCursosConAlumnos = req.user.sub;

        cursoModel.save((err, cursoGuardado) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!cursoGuardado) return res.status(500).send({ mensaje: "Error al guardar la Encuesta"});
            
            return res.status(200).send({ curso: cursoGuardado });
        });
    } else{
        return res.status(500).send({ mensaje: "Debe rellenar los campos necesarios." });
    }
}

function obtenerCursos(req, res) {
    Curso.find({}, (err, cursosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!cursosEncontrados) return res.status(500).send({ mensaje: "Error al obtener los cursos."});

        return res.status(200).send({ cursos: cursosEncontrados });
    })//.populate('idCursosConAlumnos','nombre apellido');
        
}

function ObtenerCursosId(req, res) {
    var idCur = req.params.idCurso;

    Curso.findById(idCur, (err, cursoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!cursoEncontrado) return res.status(404).send( { mensaje: 'Error al obtener los datos' });

        return res.status(200).send({ curso: cursoEncontrado });
    })
}

/*function agregarRespuestaEncuesta(req, res) {
    var idEnc = req.params.idEncuesta;
    var parametros = req.body;

    Encuesta.findByIdAndUpdate(idEnc, { $push: { respuestas: { textoRespuesta: parametros.textoRespuesta,
        idUsuarioRespuesta: req.user.sub } } }, {new: true}, (err, respuestaAgregada) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!respuestaAgregada) return res.status(500).send({ mensaje: 'Error al agregar la Respuesta'});

            return res.status(200).send({ respuesta: respuestaAgregada })
    })
}

function editarRespuestaEncuesta(req, res) {
    var idResp = req.params.idRespuesta;
    var parametros = req.body;

    // Encuesta.findOneAndUpdate({ "respuestas._id" : idResp, "respuestas.idUsuarioRespuesta": req.user.sub },
    Encuesta.findOneAndUpdate({ respuestas: { $elemMatch : { _id: idResp, idUsuarioRespuesta: req.user.sub } } },
        { "respuestas.$.textoRespuesta": parametros.textoRespuesta }, {new : true}, (err, respuestaEditada)=>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!respuestaEditada) return res.status(500)
                .send({ mensaje: "No tiene acceso para editar esta respuesta"});

            return res.status(200).send({ respuesta: respuestaEditada });
    })
}

function obtenerEncuestasUsuario(req, res) {
    Encuesta.find({ idCreadorEncuesta : req.user.sub }, (err, encuestasEncontradas) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!encuestasEncontradas) return res.status(500).send({ mensaje: "Error al obtener las encuestas"});

        return res.status(200).send({ encuestas: encuestasEncontradas });
    })
}*/

/*function EditarCurso(req, res) {
    var idCur = req.params.idCurso;
    var parametros = req.body;    

    if ( idCur !== req.user.sub ) return res.status(500)

    
    Curso.findByIdAndUpdate(req.user.sub, parametros, {new : true},
        (err, cursoActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!cursoActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el curso'});
            
            return res.status(200).send({curso : cursoActualizado})
        })
}*/

function EditarCurso (req, res) {
    var idCur = req.params.idCurso;
    var parametros = req.body;

    Curso.findByIdAndUpdate(idCur, parametros, { new: true } ,(err, cursoActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoActualizado) return res.status(404).send( { mensaje: 'Error al Editar el Curso'});

        return res.status(200).send({ curso: cursoActualizado});
    });
}

/*function EliminarCurso(req, res) {
    var idCur = req.params.idCurso;

    if ( idCur !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede eliminar otros cursos'});

    Curso.findByIdAndDelete(req.user.sub, (err, cursoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el Curso'});

        return res.status(200).send({ curso: cursoEliminado});
    })
}*/

function EliminarCurso(req, res) {
    var idCur = req.params.idCurso;

    Curso.findByIdAndDelete(idCur, (err, cursoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el curso'});

        return res.status(200).send({ curso: cursoEliminado});
    })
}

module.exports = {
    agregarCurso,
    obtenerCursos,
    EditarCurso,
    EliminarCurso,
    ObtenerCursosId
    //agregarRespuestaEncuesta,
    //editarRespuestaEncuesta,
   // obtenerEncuestasUsuario
}