import { createContext, useContext, useState } from "react";
import { consultaEventos, consultaEvento } from "../api/eventos.js";
import { ActualizarEvento, EliminarEvento } from "../api/dashboardnosql.js";

const eventosContext = createContext()

export const useEventos = () => {
    const context =  useContext(eventosContext)

    if (!context) {
        throw new Error("useEventos must be used within a eventosProvider")
    }

    return context
}
export function EventosProvider({children}) {

    const [eventos, setEventos] = useState([])
    const [evento, setEvento] = useState({})

    const mostrarEventos = async () => { 
        try {
            const respuesta = await consultaEventos()
            setEventos(respuesta.data)
            return respuesta.data
        } catch (error) {
            console.error(error)
        }
    }
    const mostrarEvento = async (id) => {
        try {
            const respuesta = await consultaEvento(id)
            setEvento(respuesta.data)
            return respuesta.data
        } catch (error) {
            console.error(error)
        }
    }

    const eliminarEvento = async (id) => {
        try {
            const respuesta = await EliminarEvento(id)
            if (respuesta.status === 200) setEventos(eventos.filter(evento => evento._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarEvento = async (id, params) => {
        try {
            const respuesta = await ActualizarEvento(id, params)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <eventosContext.Provider 
        value={{
            evento,
            eventos,
            mostrarEventos,
            mostrarEvento,
            eliminarEvento,
            actualizarEvento,
            }}>
            {children}
        </eventosContext.Provider>
    )
}