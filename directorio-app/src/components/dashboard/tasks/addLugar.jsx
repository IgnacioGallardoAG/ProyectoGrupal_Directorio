import { AgregarLugar } from "../../../api/dashboard.js"
import {useForm} from "react-hook-form"
import { Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

// task: agregar un lugar en el dashboard
function AddLugar() {
    

    const {register, handleSubmit, formState: {errors}} = useForm()     // se utiliza useForm para crear un formulario
    const [errores, setErrores] = useState([]) // se utiliza useState para manejar los errores
    const reenviar = useNavigate() // navigate para redireccionar


    const onSubmit = async (data) => {
        try {
            const formData = new FormData()

            formData.append("nombre_lugar", data.nombre_lugar)
            formData.append("direccion_lugar", data.direccion_lugar)
            formData.append("descripcion_lugar", data.descripcion_lugar)
            formData.append("imagen", data.imagen[0])

            const respuesta = await AgregarLugar(formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            alert("Lugar creado con exito")
            reenviar('/dashboard/lugares')
        } catch (error) {
            setErrores(error.response.data)
        }
        
    }

    return (

        // se crea el formulario y con register de useForm() se guardan los datos
        <div className="container-form">
            <Link id="volver-btn1" to="/dashboard/lugares"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>  Regresar</Link>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">               
                <input 
                    type="text"
                    placeholder="Nombre del Lugar"
                    {...register("nombre_lugar", {required: true})}
                    id="nombre_lugar"
                    autoFocus
                />

                    {       
                    errors.nombre_lugar &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> El nombre del lugar es requerido.</p>
                    }
                
                <input 
                    type="text"
                    placeholder="Direccion del lugar"
                    id="direccion_lugar"
                    {...register("direccion_lugar", {required: true})}
                />
                    {       
                    errors.direccion_lugar &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La direccion del lugar es requerida.</p>
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

                <input 
                    type="file"
                    name="imagen"
                    id="imagen"
                    {...register("imagen", {required: true})}
                />
                    {       
                    errors.imagen &&
                        <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> Una imagen para identificar el lugar es requerida</p>
                    }
                
                <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default AddLugar;