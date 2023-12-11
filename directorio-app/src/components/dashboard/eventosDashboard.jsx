import HeaderDashboard from "./headerDashboard";
import '../../styles/dashboard.css'
import { useEventos} from "../../context/eventosContext"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

function EventosDashboard() {

    const { mostrarEventos, eventos, eliminarEvento } = useEventos()
    const navigate = useNavigate()
    
    useEffect(() => {
        mostrarEventos()
    }, [])

    return (
        <>
        <HeaderDashboard/>
        <div className="container-btn-task">
            <Link className="btn-add" to="/dashboard/eventos/add"><FontAwesomeIcon icon={faPlus}/></Link>
        </div>
        <div className="container-tabla">
            <h1>Eventos</h1>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha y Hora</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento._id}>
                            <td>{evento._id}</td>
                            <td>{evento.nombre_evento}</td>
                            <td>{evento.fecha_hora}</td>
                            <td id="columna-opciones">
                                <button id="btn-eliminar" onClick={() => {
                                    if (window.confirm("¿Estás seguro? ")) {
                                        eliminarEvento(evento._id)
                                    }
                                }}>Eliminar</button>
                                <Link id="btn-editar" to={`/dashboard/eventos/edit/${evento._id}`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default EventosDashboard;