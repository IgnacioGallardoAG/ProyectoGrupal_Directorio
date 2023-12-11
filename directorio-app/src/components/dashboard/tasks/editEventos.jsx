import {useForm} from 'react-hook-form'
import { Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEventos } from '../../../context/eventosContext.jsx'

function EditEvento() {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const [errores, setErrores] = useState([])
    const reenviar = useNavigate()
    const {mostrarEvento, actualizarEvento} = useEventos()

    const parametros = useParams()

    useEffect(() => {
       async function cargarEvento() {
            if (parametros.id) {
                const evento = await mostrarEvento(parametros.id)
                if (evento){
                    console.log(evento)
                    setValue('nombre_evento', evento.nombre_evento)
                    const fechaHoraFormato = new Date(evento.fecha_hora).toISOString().slice(0, 16);
                    setValue('fechaHoraFormato', fechaHoraFormato)
                    setValue('direccion_evento', evento.direccion_evento)
                    setValue('descripcion_evento', evento.descripcion_evento)
            }
       }}
       cargarEvento()
    }, [])

    const onSubmit = async (data) => {
        if(parametros.id) {
            actualizarEvento(parametros.id, data)
            alert("Evento actualizado con exito!")
            reenviar('/dashboard/eventos')
        } 
    }

    return (
        <div className="container-form">
            <Link id="volver-btn1" to="/dashboard/eventos"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>  Regresar</Link>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Nombre del Evento"
                    {...register("nombre_evento", { required: true })}
                    id="nombre_evento"
                    autoFocus
                />

                {errors.nombre_evento &&
                    <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El nombre del evento es requerido</p>
                }

                <input
                    type="datetime-local"
                    placeholder="Fecha y Hora"
                    {...register("fechaHoraFormato", { required: true })}
                    id="fechaHoraFormato"
                />

                {errors.fecha_hora &&
                    <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La fecha y hora del evento es requerida</p>
                }
                <textarea
                    type="text"
                    placeholder="Direccion"
                    {...register("direccion_evento", { required: true })}
                    id="direccion_evento"
                />

                {errors.direccion &&
                    <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La direccion del evento es requerida</p>
                }
                
                <textarea
                    type="text"
                    placeholder="Descripcion"
                    {...register("descripcion_evento", { required: true })}
                    id="descripcion_evento"
                />

                {errors.descripcion &&
                    <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La descripcion del evento es requerida</p>
                }

                <button type="submit" id="btn-submit">Actualizar</button>
            </form>
        </div>
    )
}

export default EditEvento