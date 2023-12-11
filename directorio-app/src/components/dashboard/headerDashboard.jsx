import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function HeaderDashboard() {
    const [linkMarcado, setLinkMarcado] = useState(null);
    const location = useLocation();


    // con useEffect ejecutamos el codigo que esta abajo apenas cargue la pagina
    useEffect(() => {
        if (location.pathname === "/dashboard/negocios") { // se verifica si la ruta de la pagina actual corresponde a la que esta en la condicion
            setLinkMarcado("negocios"); // si la condicion es true seteamos en la categoria correspondiente
        } else if (location.pathname === "/dashboard/lugares") {
            setLinkMarcado("lugares");
        } else if (location.pathname === "/dashboard/eventos") {
            setLinkMarcado("eventos");
        }
    }, [location]); // se devuelve un arreglo con las "rutas"

    return (
        <div className="container-dashboard">
            <ul>
                <li>
                    {/* Decimos que al hacer click se ejecute setLinkMarcado y si corresponde, llamar a la clase con los estilos .marcado */}
                    <Link to="/dashboard/negocios" onClick={() => setLinkMarcado("negocios")} className={linkMarcado === "negocios" ? "marcado" : ""}> Negocios </Link>
                </li>
                <li>
                    <Link to="/dashboard/lugares" onClick={() => setLinkMarcado("lugares")} className={linkMarcado === "lugares" ? "marcado" : ""}> Lugares </Link>
                </li>
                <li>
                    <Link to="/dashboard/eventos" onClick={() => setLinkMarcado("eventos")} className={linkMarcado === "eventos" ? "marcado" : ""}> Eventos </Link>
                </li>
            </ul>
        </div>
    );
}
