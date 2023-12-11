import { useEffect, useState} from "react";
import { useForm } from 'react-hook-form'
import { useLugares } from "../context/lugaresContext.jsx";
import { Link, useParams, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios.js'
import "../styles/lugaresDetails.css"
import { useAuth } from "../context/AuthContext";
import { AgregarReseñaLugar } from "../api/resenas";
import { useResenas } from "../context/resenasContext";
import ResenaCardLugar from "./resenaCardLugar.jsx";

function NegocioDetails() {

    const {mostrarLugar, lugar} = useLugares()
    const {mostrarResenasLugar, resenasLugar} = useResenas()
    const {handleSubmit, register} = useForm()
    const {usuario} = useAuth()
    const parametros = useParams()
    const reenviar = useNavigate()

    const [imagenURL, setImagenURL] = useState('');

    useEffect(() => {
        // Hacer una solicitud al servidor para obtener la URL de la imagen
        axios.get(`http://localhost:4000/imagenes/getLugarURL/${lugar.id}`)
          .then(response => {
            setImagenURL(response.data);
          })
          .catch(error => {
            console.error('error al obtener el url la imagen', error);
          });
      }, [lugar.id]);


    // hooks que se ejecutan apenas carca la pagina
    useEffect(() => {
        if (parametros.id) {
            mostrarLugar(parametros.id)
        }
    }, [parametros.id])

    useEffect(() => {
        if (lugar.id) {
            mostrarResenasLugar();
        }
    }, [lugar.id]);

    console.log(resenasLugar)


    // cargamos los datos en la peticion al backend para agregar una resena
    const onSubmit = async (data) => {
        try {
            const datos = {
                id_usuario: usuario.id,
                id_lugar: lugar.id,
                comentario: data.comentario,
                calificacion: data.calificacion,
            }
            await AgregarReseñaLugar(datos)
            alert("Reseña creada correctamente!")
                
        } catch (error) {
            console.error(error)
        }
        }

    return (
        <>
        <div className="container-details-negocios">
            <Link id="volver-btn" to="/lugares"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Link>
            <h1 id="titulo-detail"> {">>"} {lugar.nombre_lugar}{" <<"}</h1>
            
            <div className="negocio-details">
                <div className="negocio-details-left">
                    <h2> { ">> "} Detalles del Lugar:</h2>
                    <p id="titulo-negocio"><b>Descripción:</b> {lugar.descripcion_lugar}</p>
                    <p id="titulo-negocio"><b>Direccion:</b> {lugar.direccion_lugar}</p>
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
                    {resenasLugar
                    .filter(resena => resena.id_lugar === lugar.id)
                    .map(resena => (
                        <ResenaCardLugar resena={resena} key={resena.id}/>
                    ))}
            </div>
        </div>
        </>
        
    )
}

export default NegocioDetails;