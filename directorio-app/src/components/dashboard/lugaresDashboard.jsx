import HeaderDashboard from "./headerDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {useLugares} from "../../context/lugaresContext.jsx"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function LugaresDashboard() {

    const {mostrarLugares, lugares, eliminarLugar} = useLugares()
    const navigate = useNavigate()
    

    useEffect(() => {
        mostrarLugares()
    }, [])

    return (
        <>
        <HeaderDashboard/>
        <div className="container-btn-task">
            <Link className="btn-add" to="/dashboard/lugares/add"><FontAwesomeIcon icon={faPlus}/></Link>
        </div>
        <div className="container-tabla">
            <h1>Lugares</h1>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lugares.map((lugar) => (
                        <tr key={lugar.id}>
                            <td>{lugar.id}</td>
                            <td>{lugar.nombre_lugar}</td>
                            <td id="columna-opciones">
                                <button id="btn-eliminar" onClick={() => {
                                    if (window.confirm("¿Estás seguro? ")) {
                                        eliminarLugar(lugar.id)
                                    }
                                }}>Eliminar</button>
                                <Link id="btn-editar" to={`/dashboard/lugares/edit/${lugar.id}`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default LugaresDashboard;