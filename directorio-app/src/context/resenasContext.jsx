import { createContext, useContext, useState } from "react";
import { AgregarReseñaNegocio, MostrarReseñaNegocio, MostrarReseñasLugar, MostrarReseñasNegocio, AgregarReseñaLugar, MostrarReseñaLugar} from "../api/resenas";

const resenasContext = createContext()

export const useResenas = () => {
    const context =  useContext(resenasContext)

    if (!context) {
        throw new Error("useResenas must be used within a resenasProvider")
    }

    return context
}
export function ResenasProvider({children}) {


    //negocios
    const [resenas, setResenas] = useState([])
    const [resena, setResena] = useState([])

    //lugares
    const [resenasLugar, setResenasLugar] = useState([])
    const [resenaLugar, setResenaLugar] = useState([])

    const mostrarResenas = async () => {
        try {
            const respuesta = await MostrarReseñasNegocio()
            setResenas(respuesta.data)
        } catch (error) {
            console.error('Error al obtener los detalles de la reseña:', error);
        }
    }

    const mostrarResenasLugar = async () => {
        try {
            const respuesta = await MostrarReseñasLugar()
            
            setResenasLugar(respuesta.data)
        } catch (error) {
            console.error('Error al obtener los detalles de la reseña:', error);
        }
    }

    const mostrarResenaLugar = async (id) => {
        try {
            const respuesta = await MostrarReseñaLugar(id)
            setResenaLugar(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    const mostrarResena = async (id) => {
        try {
            const respuesta = await MostrarReseñaNegocio(id)
            setResena(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarResena = async (id) => {}

    const agregarResena = async (resena) => {
        try {
            await AgregarReseñaNegocio(resena)
        } catch (error) {
            console.error(error)
        }

    }

    const agregarResenaLugar = async (resena) => {
        try {
            await AgregarReseñaLugar(resena)
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <resenasContext.Provider 
        value={{
            resenas,
            resena,
            agregarResenaLugar,
            mostrarResenaLugar,
            mostrarResenasLugar,
            resenaLugar,
            resenasLugar,
            setResena,
            mostrarResena,
            mostrarResenas, 
            eliminarResena,
            agregarResena,
            }}>
            {children}
        </resenasContext.Provider>
    )
}