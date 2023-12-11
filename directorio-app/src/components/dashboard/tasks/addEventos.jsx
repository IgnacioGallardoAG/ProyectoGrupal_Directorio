import { AgregarEvento } from "../../../api/dashboardnosql.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AddEvento() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errores, setErrores] = useState([]);
    const reenviar = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("direccion_evento", data.direccion_evento);
            formData.append("nombre_evento", data.nombre_evento);
            formData.append("fecha_hora", data.fecha_hora);
            formData.append("descripcion_evento", data.descripcion_evento);
            formData.append("imagen", data.imagen[0]);

            console.log(formData)
            const respuesta = await AgregarEvento(formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(respuesta.data);
            alert("Evento creado con exito");
            reenviar("/dashboard/eventos");
        } catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <div className="container-form">
            <Link id="volver-btn1" to="/dashboard/eventos"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>  Regresar</Link>
            
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Direccion del Evento"
                    {...register("direccion_evento", { required: true })}
                    id="direccion_evento"
                    autoFocus
                />

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
                    {...register("fecha_hora", { required: true })}
                    id="fecha_hora"
                />

                {errors.fecha_hora &&
                    <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La fecha y hora son requeridos</p>
                }

                <input
                    type="text"
                    placeholder="Descripcion_evento"
                    {...register("descripcion_evento", { required: true })}
                    id="descripcion_evento"
                />

                {errors.descripcion &&
                    <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La descripcion es requerida</p>
                }

                <input
                    type="file"
                    placeholder="Imagen"
                    {...register("imagen", { required: true })}
                    id="imagen"
                />

                {errors.imagen &&
                    <p className="error"><FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon> La imagen es requerida</p>
                }

                <button type="submit">Agregar Evento</button>
            </form>
        </div>
    );
}

export default AddEvento;