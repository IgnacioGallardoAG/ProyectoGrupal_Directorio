import Usuario from "../models/usuarioModel.js"
import { Sequelize } from "sequelize"
import bcrypt from "bcrypt"
import {crearTokenDeAcceso} from '../libs/jwt.js'
import jwt  from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export const verificarUsuario = async (nombre, correo) => {
    try {
      // con el metodo findOne verificamos si la cuenta que se quiere crear ya existe
      // por obviedad deben coincidir el nombre y el correo por lo que tomamos esos parametros para hacer la busqueda (where)
      const usuario = await Usuario.findOne({
        where: {
          [Sequelize.Op.or]: [
            { nombre_usuario: nombre }, 
            { correo_usuario: correo }, 
          ],
        },
      });
      // si no se encuentra, retornar que el usuario no existe (se puede crear)
      return !!usuario
    } catch (error) {
      throw error
  }
}

export const registerFunction = async (req, res) => {
  const { nombre_usuario, contraseña, correo_usuario } = req.body;

  try {
    // usamos la funcion creada en loginController para verificar la existencia de un usuario y pasamos los parametros solicitados
    const usuarioExistente = await verificarUsuario(nombre_usuario, correo_usuario);

    // si el usuario exite, enviar un mensaje con el error especifico
    if (usuarioExistente) {
      return res.status(409).json(["El usuario ya existe"]);
    }

    // si el usuario no existe, registrar un nuevo usuario en la bd
    await register(nombre_usuario, contraseña, correo_usuario);

    // crea el token de acceso para el usuario registrado
    const token = await crearTokenDeAcceso({usuarioId: nombre_usuario.id})
    
    // se establece la cookie
    res.cookie('token', token)

    res.status(200).json({
      success: true,
      message: "Usuario registrado correctamente",
      id: nombre_usuario.id,
      nombre: nombre_usuario,
      correo: correo_usuario,
    })

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
}

export const register = async(nombre, contraseña, correo) => {
    try {
      const saltRounds = 5;
      // con la biblioteca bcrypt y el metodo hash() hasheamos la contraseña (la dejamos en un formato mas seguro)
      const contraseñaHash = await bcrypt.hash(contraseña, saltRounds)
  
      // creamos la tabla con los datos ingresados y la contraseña hasheada
      await Usuario.create({
        nombre_usuario: nombre,
        contraseña: contraseñaHash, 
        correo_usuario: correo, 
        rango: "usuario", // esto se agrega para la diferenciacion de rangos de los usuarios (por defecto es "usuario")
        imagen: "default.png",
      })

    } catch (error) {
      throw error
    }
}
  
export const login = async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;

    try {
        // Verifica si nombre_usuario es válido
        if (!nombre_usuario || nombre_usuario.trim() === "") {
            return res.status(400).json(['El nombre de usuario es obligatorio']);
        }
       
        // con el metodo findOne buscamos un nombre en la base de datos igual al que se ingreso
        const usuario = await Usuario.findOne({ where: { nombre_usuario } });
       
           // si no existe, enviar un mensaje de error
         if (!usuario) {
         return res.status(404).json(['Usuario no encontrado']);
         }

       // con la biblioteca bcrypt y el metodo compare, la contrasena ingresada la comparamos con la que esta en la bd
         const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

         if (!contraseñaValida) {
         return res.status(401).json(['Contraseña incorrecta']);
       }
      
       const token = await crearTokenDeAcceso({usuarioId: usuario.id})
       
       res.cookie('token', token)
       
       res.status(200).json({
        id: usuario.id,
        nombre: usuario.nombre_usuario,
        correo: usuario.correo_usuario,
        rango: usuario.rango,
       })

        // si todo sale bien y los datos concuerdan, se genera un token de expiracion a 1h (se puede modificar el tiempo),
        // con este token luego podemos verificar al usuario en las distintas paginas que requieran autentificacion


    } catch (error) {
        console.error('Error en la autentificación:', error);
        res.status(500).json('Error en el servidor', error.message );
    }
}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const usuarioEncontrado = await Usuario.findByPk(req.user.usuarioId);
  if (!usuarioEncontrado) return res.status(400).json({message: "Usuario no encontrado"})

  return res.json({
    id: usuarioEncontrado.id,
    nombre: usuarioEncontrado.nombre_usuario,
    correo: usuarioEncontrado.correo_usuario,
    rango: usuarioEncontrado.rango,
  })
}


// esta funcion verifica si el token es valido y si no lo es envia un status 401 (no autorizado), si encuentra al usuario responde con los datos
export const verificarToken = async (req, res) => {
  const { token } = req.cookies

  if(!token) return res.status(401).json({message: "No autorizado"})
  
  jwt.verify(token, TOKEN_SECRET, async (err, usuario) => {
    if(err) return res.status(err).json({message: "No autorizado"})
 
    const usuarioEncontrado = await Usuario.findByPk(usuario.usuarioId);

    if (!usuarioEncontrado) return res.status(401).json({message: "No autorizado"})

    return res.json({
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre_usuario,
      correo: usuarioEncontrado.correo_usuario,
      rango: usuarioEncontrado.rango,
    })
  })
}

