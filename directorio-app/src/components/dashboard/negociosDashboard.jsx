import HeaderDashboard from "./headerDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useNegocios } from "../../context/negociosContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function NegociosDashboard() {

    const { mostrarNegocios, negocios, eliminarNegocio } = useNegocios()
    const navigate = useNavigate()
    
    useEffect(() => {
        mostrarNegocios()
    }, [])


    return (
        <>
        <HeaderDashboard/>
        <div className="container-btn-task">
            <Link className="btn-add" to="/dashboard/negocios/add"><FontAwesomeIcon icon={faPlus}/></Link>
        </div>
        <div className="container-tabla">
            <h1>Negocios</h1>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {negocios.map((negocio) => (
                        <tr key={negocio.id}>
                            <td>{negocio.id}</td>
                            <td>{negocio.nombre}</td>
                            <td id="columna-opciones">
                                <button id="btn-eliminar" onClick={() => {
                                    if (window.confirm("¿Estás seguro? ")) {
                                        eliminarNegocio(negocio.id)
                                    }
                                    
                                }}>Eliminar</button>
                                <Link id="btn-editar" to={`/dashboard/negocios/edit/${negocio.id}`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default NegociosDashboard;