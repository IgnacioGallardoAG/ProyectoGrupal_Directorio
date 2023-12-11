import { AgregarLugar } from "../../../api/dashboard.js"
import {useForm} from "react-hook-form"
import { Link, useParams, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import { useLugares } from "../../../context/lugaresContext.jsx"
import { MostrarLugar } from "../../../api/dashboard.js"
function EditLugar() {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const [errores, setErrores] = useState([])
    const reenviar = useNavigate()
    const {mostrarLugar, actualizarLugar, lugar} = useLugares()

    const parametros = useParams()
    console.log(parametros.id)

    console.log(parametros.id)
    useEffect(() => {
       async function cargarLugar() {
            if (parametros.id) {
                const lugar = await mostrarLugar(parametros.id)
                setValue("nombre_lugar", lugar.nombre_lugar)
                setValue("direccion_lugar", lugar.direccion_lugar)      
                setValue("descripcion_lugar", lugar.descripcion_lugar)      
            }
       }
       cargarLugar()
    }, [])


    const onSubmit = async (data) => {
        if(parametros.id) {
            actualizarLugar(parametros.id, data)
            alert("Lugar actualizado con exito!")
            console.log(data)
            
        } 
    }

    return (
        <div className="container-form">
            <Link id="volver-btn1" to="/dashboard/lugares"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>  Regresar</Link>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <input 
                    type="text"
                    placeholder="Nombre de Lugar"
                    {...register("nombre_lugar", {required: true})}
                    id="nombre_lugar"
                    autoFocus
                />
                    {       
                    errors.nombre_lugar &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El nombre del lugar es requerido</p>
                    }
                
                <input 
                    type="text"
                    placeholder="Direccion del lugar"
                    id="direccion_lugar"
                    {...register("direccion_lugar", {required: true})}
                />
                    {       
                    errors.direccion_lugar &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La direccion del lugar es requerido</p>
                    }
                    
                <textarea
                    rows="3"
                    id="descripcion_lugar"
                    placeholder="Descripción del Lugar"
                    {...register("descripcion_lugar", {required: true})}
                />
                    {       
                    errors.descripcion_lugar &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La descripcion es requerida</p>
                    }

                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    )
}

export default EditLugar;