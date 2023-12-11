import { AgregarNegocio } from "../../../api/dashboard.js"
import {useForm} from "react-hook-form"
import { Link, useParams, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useEffect} from "react"
import { useNegocios } from "../../../context/negociosContext.jsx"
function EditNegocio() {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const reenviar = useNavigate()
    const {mostrarNegocio, actualizarNegocio} = useNegocios()

    const parametros = useParams()
    console.log(parametros.id)
    useEffect(() => {
       async function cargarNegocio() {
            if (parametros.id) {
                const negocio = await mostrarNegocio(parametros.id)
                setValue('tipo_negocio', negocio.tipo_negocio)
                setValue('H_operacion', negocio.H_operacion)
                setValue('descripcion', negocio.descripcion)
                setValue('nombre', negocio.nombre)
                setValue('direccion', negocio.direccion)
                setValue('telefono', negocio.telefono)
                setValue('correo', negocio.correo)
            }
       }
       cargarNegocio()
    }, [])


    const onSubmit = async (data) => {
        if(parametros.id) {
            actualizarNegocio(parametros.id, data)
            alert("Negocio actualizado con exito!")
            reenviar('/dashboard/negocios')
        } 
    }

    return (
        <div className="container-form">
            <Link id="volver-btn1" to="/dashboard/negocios"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>  Regresar</Link>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <input 
                    type="text"
                    placeholder="Tipo de Negocio"
                    {...register("tipo_negocio", {required: true})}
                    id="tipo_negocio"
                    autoFocus
                />

                    {       
                    errors.tipo_negocio &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El tipo de negocio es requerido</p>
                    }
                
                <input 
                    type="text"
                    placeholder="Horario de Operacion"
                    id="H_operacion"
                    {...register("H_operacion", {required: true})}
                />
                    {       
                    errors.H_operacion &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El horario de operacion es requerido</p>
                    }

                <textarea
                    rows="3"
                    id="descripcion"
                    placeholder="Descripción del Negocio"
                    {...register("descripcion", {required: true})}
                />
                    {       
                    errors.descripcion &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La descripcion es requerida</p>
                    }

                <input 
                    type="text"
                    id="nombre"
                    placeholder="Nombre del Negocio"
                    {...register("nombre", {required: true})}
                />

                    {       
                    errors.nombre &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El nombre del negocio es requerido</p>
                    }
                
                <input 
                    type="text"
                    id="direccion"
                    placeholder="Direccion"
                    {...register("direccion", {required: true})}
                />

                    {       
                    errors.direccion &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La direccion del negocio es requerida</p>
                    }

                <input 
                    type="text"
                    id="telefono"
                    placeholder="Numero telefonico"
                    {...register("telefono", {required: true})} 
                />

                    {         
                    errors.telefono &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El telefono de contacto es requerido</p>
                    }

                <input 
                    type="email"
                    id="correo"
                    placeholder="Correo de contacto"  
                    {...register("correo", {required: true})}
                />

                    {       
                    errors.correo &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El correo electronico es requerido</p>
                    }
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    )
}

export default EditNegocio;