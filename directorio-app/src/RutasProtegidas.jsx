import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
function RutasProtegidas() {

    const {estaAutentificado} = useAuth()
    console.log(estaAutentificado)

    if(!estaAutentificado) return <Navigate to="/login" replace/>

    return <Outlet/>
}

export default RutasProtegidas;