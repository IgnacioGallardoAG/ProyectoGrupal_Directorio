import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
function RutaDashboard() {

    const {loading, estaAutentificado, usuario} = useAuth()

    const esAdmin = usuario && usuario.rango === 'administrador'

    if(!estaAutentificado && !esAdmin) return <Navigate to="/profile" replace/>

    return <Outlet/>
}

export default RutaDashboard;