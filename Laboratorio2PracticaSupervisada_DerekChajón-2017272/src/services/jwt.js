const jwt_simple = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_IN6BM2';

exports.crearToken = function (maestro) {
    let payload = {
        sub: maestro._id,
        nombre: maestro.nombre,
        email: maestro.email,
        rol: maestro.rol,
        usuario: maestro.usuario,
        iat: moment().unix(),
        exp: moment().day(7, 'days').unix()
    }

    return jwt_simple.encode(payload, secret);
}