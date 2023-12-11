import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useNegocios } from "../context/negociosContext";
import { Link, useParams, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import "../styles/negociosDetails.css"
import { useAuth } from "../context/AuthContext";
import { AgregarReseñaNegocio} from "../api/resenas";
import { useResenas } from "../context/resenasContext";
import ResenaCardNegocio from "./resenaCardNegocio";
import axios from '../api/axios'

function NegocioDetails() {

    const {mostrarNegocio, negocio} = useNegocios()
    const {mostrarResenas, resenas} = useResenas()
    const {handleSubmit, register} = useForm()
    const {usuario} = useAuth()
    const parametros = useParams()
    const reenviar = useNavigate()
    const [imagenURL, setImagenURL] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:4000/imagenes/getNegocioURL/${negocio.id}`)
          .then(response => {
            setImagenURL(response.data);
          })
          .catch(error => {
            console.error('error al obtener el url la imagen', error);
          });
      }, [negocio.id]);

    // hooks que se ejecutan apenas carca la pagina
    useEffect(() => {
        if (parametros.id) {
            mostrarNegocio(parametros.id)
        }
    }, [parametros.id])

    useEffect(() => {
        if (negocio.id) {
            mostrarResenas();
        }
    }, [negocio.id]);

    console.log(resenas)


    // cargamos los datos en la peticion al backend para agregar una resena
    const onSubmit = async (data) => {
        try {
            const datos = {
                id_usuario: usuario.id,
                id_negocio: negocio.id,
                comentario: data.comentario,
                calificacion: data.calificacion,
            }
            await AgregarReseñaNegocio(datos)
            alert("Reseña creada correctamente!")
            reenviar(`/negocios`)
                
        } catch (error) {
            console.error(error)
        }
        }

    return (
        <>
        <div className="container-details-negocios">
            <Link id="volver-btn" to="/negocios"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Link>
            <h1 id="titulo-detail"> {">>"} {negocio.nombre}{" <<"}</h1>
            
            <div className="negocio-details">
                <div className="negocio-details-left">
                    <h2> { ">> "}Detalles del Negocio:</h2>
                    <p id="titulo-negocio"><b>Descripción:</b> {negocio.descripcion}</p>
                    <p id="titulo-negocio"><b>Tipo de Negocio:</b> {negocio.tipo_negocio}</p>
                    <p id="titulo-negocio"><b>Horario de Operación:</b> {negocio.H_operacion}</p>
                    <p id="titulo-negocio"><b>Dirección:</b> {negocio.direccion}</p>
                    <h2> { ">> "}Contacto:</h2>
                    <p id="titulo-negocio"><b>Teléfono:</b> {negocio.telefono}</p>
                    <p id="titulo-negocio"><b>Correo Electrónico:</b> {negocio.correo}</p>
                </div>
                <div className="negocio-details-right">
                    <img id="img-detail" src={`http://localhost:4000${imagenURL}`} alt="" />    
                </div> 
            </div>
        </div>

        { /* si no hay una instacia de usuario, no esta logeado por lo que no puede hacer resenas*/ }
        {usuario ? (
        <div className="container-comentarios">
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="comentario">Escribe aqui tu opinion</label>
                <textarea
                    name="comentario"
                    rows="3"
                    id="comentario"
                    placeholder="Escribe aqui tu comentario"
                    {...register("comentario", {required: true})}
                    required
                />

                <label htmlFor="calificacion">Valoracion</label>
                <input 
                    name="calificacion"
                    id="calificacion"
                    type="number"
                    min={1}
                    max={5}
                    {...register("calificacion", {required: true})}
                    required
                />

                <input type="submit" value="Enviar Comentario" />
            </form>
        </div>
        ) : (
            <div className="container-comentarios">
                <p id="not-logged">Oops! No estas logeado, <Link to="/login">Inicia sesion</Link> para dejar una reseña.</p>
            </div>
        )}

        <div className="container-all-comentarios">
            <h1>Reseñas de otros usuarios</h1>
            <div className="container-card-resena">
                    {resenas
                    .filter(resena => resena.id_negocio === negocio.id)
                    .map(resena => (
                        <ResenaCardNegocio resena={resena} key={resena.id}/>
                    ))}
            </div>
        </div>
        </>
        
    )
}

export default NegocioDetails;