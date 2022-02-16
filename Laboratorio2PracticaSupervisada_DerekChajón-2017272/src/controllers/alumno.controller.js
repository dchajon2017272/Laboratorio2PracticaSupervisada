const Alumno = require('../models/alumno.model');
const Curso = require('../models/curso.model');

const bcrypt = require('bcrypt-nodejs');
const jwtAlumno = require('../services/jwtAlumno');

function Registrar(req, res) {
    var parametros = req.body;
    var alumnoModel = new Alumno();

    if(parametros.nombre && parametros.apellido && 
        parametros.email && parametros.usuario && parametros.password) {
            alumnoModel.nombre = parametros.nombre;
            alumnoModel.apellido = parametros.apellido;
            alumnoModel.usuario = parametros.usuario;
            alumnoModel.email = parametros.email;
            alumnoModel.rol = 'ROL_ALUMNO';
            //alumnoModel.imagen = null;

            Alumno.find({ email : parametros.email }, (err, alumnoEncontrado) => {
                if ( alumnoEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        alumnoModel.password = passwordEncriptada;

                        alumnoModel.save((err, alumnoGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!alumnoGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Alumno'});
                            
                            return res.status(200).send({ alumno: alumnoGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya se encuentra utilizado' });
                }
            })
    }
}

function Login(req, res) {
    var parametros = req.body;
    Alumno.findOne({ usuario : parametros.usuario }, (err, alumnoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(alumnoEncontrado){
            // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, alumnoEncontrado.password, 
                (err, verificacionPassword)=>{//TRUE OR FALSE
                    // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
                    if ( verificacionPassword ) {
                        // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwtAlumno.crearToken(alumnoEncontrado) })
                        } else {
                            alumnoEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ alumno: alumnoEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contraseñas no coinciden'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
}

function agregarCursos(req, res) {
    var idAlum = req.params.idAlumno;
    var parametros = req.body;

    Alumno.findByIdAndUpdate(idAlum, { $push: { cursos: { curso: parametros.curso} } }, {new: true}, 
        (err, cursoAgregado) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!cursoAgregado) return res.status(500).send({ mensaje: 'Error al agregar el curso'});

            return res.status(200).send({ curso: cursoAgregado })
    })
}

function EditarPerfil(req, res) {
    var idAlum = req.params.idAlumno;
    var parametros = req.body;    

    if ( idAlum !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios'});
    
    Alumno.findByIdAndUpdate(req.user.sub, parametros, {new : true},
        (err, alumnoActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!alumnoActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario'});
            
            return res.status(200).send({alumno : alumnoActualizado})
        })
}


function EliminarPerfil(req, res) {
    var idAlum = req.params.idAlumno;

    if ( idAlum !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede eliminar otros usuarios'});

    Alumno.findByIdAndDelete(req.user.sub, (err, alumnoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!alumnoEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el Alumno'});

        return res.status(200).send({ alumno: alumnoEliminado});
    })
}



module.exports = {
    Registrar,
    Login,
    EditarPerfil,
    EliminarPerfil,
    agregarCursos
}