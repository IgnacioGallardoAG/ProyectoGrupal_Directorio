import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from '../api/axios.js'

const ProfileComponents = ({id}) => {

    const { usuario } = useAuth();
    const [seleccionarImagen, setSeleccionarImagen] = useState(null)
    const [imagenURL, setImagenURL] = useState('');

    useEffect(() => {
        // Hacer una solicitud al servidor para obtener la URL de la imagen
        axios.get(`http://localhost:4000/imagenes/obtenerImageURL/${usuario.id}`)
          .then(response => {
            setImagenURL(response.data);
          })
          .catch(error => {
            console.error('error al obtener el url la imagen', error);
          });
      }, [id]);

      console.log(imagenURL)

    const manejarCambioImagen = (evento) => {
        setSeleccionarImagen(evento.target.files[0])
    }

    const manejarEnvio =  async (evento) => {
        evento.preventDefault()

        if (!seleccionarImagen) {
            alert("Selecciona una imagen")
            return 
        }

        try {
            const formData =  new FormData()
            formData.append('imagen', seleccionarImagen)

            const respuesta = await axios.post(`/imagenes/perfil/${usuario.id}/images`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                },
            })
            setImagenURL(respuesta.data.url)
            
            console.log(respuesta.data)
            alert(respuesta.data)
        } catch (error) {
            console.error(error)
            alert("Error al actualizar la imagen de perfil")
        }
    }

    const recargarPagina  = (evento) => {
        location.reload()
        return
    }


    return (
        <div className="container-profile">

            <h1>Datos del usuario:</h1>
            <div className="container-profile-inside">
                <div><img className="img-perfil" src={`http://localhost:4000${imagenURL}`} alt="Imagen de perfil" /></div>
                <ul>
                    <li><b>Nombre de usuario: </b> {usuario.nombre}</li>
                    <li><b>Correo: </b> {usuario.correo}</li>
                    <li><b>Rol: </b> {usuario.rango}</li>
                    <form onSubmit={manejarEnvio}>
                    <label htmlFor="imagen">Cambiar imagen de perfil:</label>
                    <input
                    type="file"
                    name="imagen"
                    id="imagen"
                    accept="imagen/*"
                    onChange={manejarCambioImagen}
                    required
                    />
                    <input onClick={recargarPagina} type="submit" value="Actualizar Imagen"></input>
                </form>
                </ul>


            </div>


        </div>
    )
}

export default ProfileComponents;