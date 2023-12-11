import { createContext, useContext, useState } from "react";
import { consultaNegocio, consultaNegocios } from "../api/negocios";
import { ActualizarNegocio, EliminarNegocio } from "../api/dashboard";
const negociosContext = createContext()

export const useNegocios = () => {
    const context =  useContext(negociosContext)

    if (!context) {
        throw new Error("useNegocios must be used within a negociosProvider")
    }

    return context
}
export function NegociosProvider({children}) {

    const [negocios, setNegocios] = useState([])
    const [negocio, setNegocio] = useState([])

    const mostrarNegocios = async () => {
        try {
            const respuesta = await consultaNegocios()
            setNegocios(respuesta.data)
        } catch (error) {
            console.error(error)
        }
    }

    const mostrarNegocio = async (id) => {
        try {
            const respuesta = await consultaNegocio(id)
            setNegocio(respuesta.data)
            return respuesta.data
        } catch (error) {
            console.error(error)
        }
    }

    const eliminarNegocio  = async (id) => {
        try {
            const respuesta = await EliminarNegocio(id)
            if (respuesta.status === 200) setNegocios(negocios.filter(negocio => negocio.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarNegocio = async (id, params) => {
        try {
            await ActualizarNegocio(id, params)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <negociosContext.Provider 
        value={{
            negocio,
            negocios,
            mostrarNegocios,
            mostrarNegocio,
            eliminarNegocio,
            actualizarNegocio,
            }}>
            {children}
        </negociosContext.Provider>
    )
}