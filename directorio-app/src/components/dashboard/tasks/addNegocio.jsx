import { AgregarNegocio } from "../../../api/dashboard.js"
import {useForm} from "react-hook-form"
import { Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"


// task: agregar un negocio en el dashboard
function AddNegocio() {

    const {register, handleSubmit, formState: {errors}} = useForm()     // se utiliza useForm para crear un formulario
    const [errores, setErrores] = useState([]) // se utiliza useState para manejar los errores
    const reenviar = useNavigate() // navigate para redireccionar


    const onSubmit = async (data) => {
        try {
            const formData = new FormData()

            formData.append("tipo_negocio", data.tipo_negocio)
            formData.append("H_operacion", data.H_operacion)
            formData.append("descripcion", data.descripcion)
            formData.append("nombre", data.nombre)
            formData.append("direccion", data.direccion)
            formData.append("telefono", data.telefono)
            formData.append("correo", data.correo)
            formData.append("imagen", data.imagen[0])

            const respuesta = await AgregarNegocio(formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            alert("Negocio creado con exito")
            reenviar('/dashboard/negocios')
        } catch (error) {
            setErrores(error.response.data)
        }
        
    }

    return (

        // se crea el formulario y con register de useForm() se guardan los datos
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

                <input 
                    type="file"
                    name="imagen"
                    id="imagen"
                    {...register("imagen", {required: true})}
                />

                    {       
                    errors.imagen &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> Una imagen para identificar el negocio es requerida</p>
                    }

                <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default AddNegocio;